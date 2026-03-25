export interface PasswordResetEmailProps {
  userName: string
  resetUrl: string
  expiresIn: string
}

export function passwordResetEmailTemplate(props: PasswordResetEmailProps): string {
  const { userName, resetUrl, expiresIn } = props

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password - DevArsenal</title>
</head>
<body style="margin:0;padding:0;background-color:#030712;font-family:'Inter',ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#030712;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:700;color:#6366f1;letter-spacing:-0.5px;">DevArsenal</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#111827;border:1px solid #1f2937;border-radius:16px;padding:48px 40px;">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="display:inline-block;background-color:#1c1917;border:1px solid #44403c;border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:24px;margin-bottom:16px;">🔒</div>
              </div>
              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#f9fafb;">Reset your password</h1>
              <p style="margin:0 0 8px;font-size:15px;color:#9ca3af;line-height:1.6;">
                Hi ${userName}, we received a request to reset your DevArsenal password.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#9ca3af;line-height:1.6;">
                Click the button below to create a new password. This link will expire in 
                <strong style="color:#f9fafb;">${expiresIn}</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="border-radius:8px;background:linear-gradient(135deg,#4f46e5,#7c3aed);">
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
                If the button doesn't work, copy and paste this URL into your browser:
              </p>
              <p style="margin:0;font-size:12px;color:#4b5563;word-break:break-all;font-family:monospace;background-color:#1f2937;padding:12px;border-radius:8px;">
                ${resetUrl}
              </p>
              <hr style="border:none;border-top:1px solid #1f2937;margin:32px 0;" />
              <p style="margin:0;font-size:13px;color:#6b7280;">
                If you didn't request a password reset, you can safely ignore this email. 
                Your password won't change.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                © ${new Date().getFullYear()} DevArsenal. 
                <a href="mailto:support@devarsenal.com" style="color:#6366f1;text-decoration:none;">support@devarsenal.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
