export interface PromptTemplate {
  name: string;
  template: string;
  variables: string[];
}

const TEMPLATES: Record<string, PromptTemplate> = {
  "summarize-article": {
    name: "summarize-article",
    template: "Summarize the following article in {{maxLength}} words or less, focusing on the key points:\n\n{{content}}",
    variables: ["content", "maxLength"],
  },
  "classify-support-ticket": {
    name: "classify-support-ticket",
    template: "Classify this support ticket into one category: billing, technical, account, feature-request, other.\n\nTicket: {{ticket}}\n\nCategory:",
    variables: ["ticket"],
  },
  "generate-email-subject": {
    name: "generate-email-subject",
    template: "Write a compelling email subject line for the following content. Maximum 60 characters.\n\nContent: {{content}}\n\nSubject:",
    variables: ["content"],
  },
  "extract-action-items": {
    name: "extract-action-items",
    template: "Extract all action items from the following meeting notes as a JSON array of strings.\n\nNotes: {{notes}}\n\nAction items (JSON array only):",
    variables: ["notes"],
  },
  "product-description": {
    name: "product-description",
    template: "Write a compelling product description for {{productName}}. Tone: {{tone}}. Length: {{length}} words. Key features: {{features}}",
    variables: ["productName", "tone", "length", "features"],
  },
};

/**
 * Renders a named prompt template with the given variables.
 */
export function renderPrompt(
  templateName: string,
  variables: Record<string, string>
): string {
  const template = TEMPLATES[templateName];
  if (!template) throw new Error(`Prompt template not found: ${templateName}`);

  let rendered = template.template;
  for (const [key, value] of Object.entries(variables)) {
    rendered = rendered.replaceAll(`{{${key}}}`, value);
  }

  const missing = template.variables.filter((v) => rendered.includes(`{{${v}}}`));
  if (missing.length > 0) {
    throw new Error(`Missing prompt variables: ${missing.join(", ")}`);
  }

  return rendered;
}

/**
 * Renders an inline template string with variables.
 */
export function renderInlinePrompt(
  template: string,
  variables: Record<string, string>
): string {
  let rendered = template;
  for (const [key, value] of Object.entries(variables)) {
    rendered = rendered.replaceAll(`{{${key}}}`, value);
  }
  return rendered;
}

/**
 * Registers a custom prompt template.
 */
export function registerPrompt(template: PromptTemplate): void {
  TEMPLATES[template.name] = template;
}

export function listPrompts(): string[] {
  return Object.keys(TEMPLATES);
}
