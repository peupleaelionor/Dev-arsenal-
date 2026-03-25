export interface AIOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface AIProvider {
  generateText(prompt: string, options?: AIOptions): Promise<string>;
  classifyText(text: string, labels: string[], options?: AIOptions): Promise<string>;
  summarizeText(text: string, maxLength?: number, options?: AIOptions): Promise<string>;
  extractData<T>(text: string, schema: Record<string, string>, options?: AIOptions): Promise<T>;
}

// ── OpenAI Provider ──────────────────────────────────────────────────────────

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = "https://api.openai.com/v1";

  constructor(apiKey: string = process.env.OPENAI_API_KEY ?? "") {
    if (!apiKey) throw new Error("OPENAI_API_KEY is required");
    this.apiKey = apiKey;
  }

  private async chat(
    messages: { role: string; content: string }[],
    options: AIOptions = {}
  ): Promise<string> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: options.model ?? "gpt-4o-mini",
        messages,
        max_tokens: options.maxTokens ?? 1024,
        temperature: options.temperature ?? 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenAI API error ${res.status}: ${err}`);
    }

    const data = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return data.choices[0]?.message?.content ?? "";
  }

  async generateText(prompt: string, options: AIOptions = {}): Promise<string> {
    const messages = [
      ...(options.systemPrompt
        ? [{ role: "system", content: options.systemPrompt }]
        : []),
      { role: "user", content: prompt },
    ];
    return this.chat(messages, options);
  }

  async classifyText(text: string, labels: string[], options: AIOptions = {}): Promise<string> {
    const prompt = `Classify the following text into exactly one of these categories: ${labels.join(", ")}.\n\nText: ${text}\n\nRespond with only the category name.`;
    return this.generateText(prompt, { ...options, temperature: 0 });
  }

  async summarizeText(text: string, maxLength = 200, options: AIOptions = {}): Promise<string> {
    const prompt = `Summarize the following text in ${maxLength} characters or less:\n\n${text}`;
    return this.generateText(prompt, options);
  }

  async extractData<T>(
    text: string,
    schema: Record<string, string>,
    options: AIOptions = {}
  ): Promise<T> {
    const schemaDesc = Object.entries(schema)
      .map(([k, v]) => `  "${k}": ${v}`)
      .join(",\n");
    const prompt = `Extract the following fields from the text as JSON:\n{\n${schemaDesc}\n}\n\nText: ${text}\n\nRespond with only valid JSON.`;
    const raw = await this.generateText(prompt, { ...options, temperature: 0 });
    return JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim()) as T;
  }
}

// ── Anthropic Provider ───────────────────────────────────────────────────────

export class AnthropicProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = "https://api.anthropic.com/v1";

  constructor(apiKey: string = process.env.ANTHROPIC_API_KEY ?? "") {
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is required");
    this.apiKey = apiKey;
  }

  private async message(
    content: string,
    options: AIOptions = {}
  ): Promise<string> {
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: options.model ?? "claude-3-haiku-20240307",
        max_tokens: options.maxTokens ?? 1024,
        system: options.systemPrompt,
        messages: [{ role: "user", content }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API error ${res.status}: ${err}`);
    }

    const data = (await res.json()) as {
      content: { type: string; text: string }[];
    };
    return data.content.find((c) => c.type === "text")?.text ?? "";
  }

  async generateText(prompt: string, options: AIOptions = {}): Promise<string> {
    return this.message(prompt, options);
  }

  async classifyText(text: string, labels: string[], options: AIOptions = {}): Promise<string> {
    const prompt = `Classify the following text into exactly one of these categories: ${labels.join(", ")}.\n\nText: ${text}\n\nRespond with only the category name.`;
    return this.message(prompt, { ...options, temperature: 0 });
  }

  async summarizeText(text: string, maxLength = 200, options: AIOptions = {}): Promise<string> {
    return this.message(`Summarize in ${maxLength} chars or less: ${text}`, options);
  }

  async extractData<T>(
    text: string,
    schema: Record<string, string>,
    options: AIOptions = {}
  ): Promise<T> {
    const schemaDesc = Object.entries(schema)
      .map(([k, v]) => `  "${k}": ${v}`)
      .join(",\n");
    const prompt = `Extract JSON:\n{\n${schemaDesc}\n}\n\nFrom: ${text}\n\nJSON only.`;
    const raw = await this.message(prompt, { ...options, temperature: 0 });
    return JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim()) as T;
  }
}

// ── Factory ──────────────────────────────────────────────────────────────────

export type AIProviderName = "openai" | "anthropic";

export function createAIProvider(provider: AIProviderName, apiKey?: string): AIProvider {
  if (provider === "openai") return new OpenAIProvider(apiKey);
  if (provider === "anthropic") return new AnthropicProvider(apiKey);
  throw new Error(`Unknown AI provider: ${provider}`);
}
