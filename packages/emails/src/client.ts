import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

const DEFAULT_FROM = process.env.EMAIL_FROM ?? 'DevArsenal <noreply@devarsenal.com>'

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<{ id: string }> {
  const { data, error } = await resend.emails.send({
    from: options.from ?? DEFAULT_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    reply_to: options.replyTo,
  })

  if (error) throw new Error(`Failed to send email: ${error.message}`)
  return { id: data!.id }
}
