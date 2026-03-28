export interface WelcomeEmailProps {
  userName: string
  userEmail: string
  dashboardUrl: string
}

export function welcomeEmailTemplate(props: WelcomeEmailProps): string {
  const { userName, dashboardUrl } = props

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to DevArsenal</title>
</head>
<body style="margin:0;padding:0;background-color:#030712;font-family:'Inter',ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#030712;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:700;color:#6366f1;letter-spacing:-0.5px;">DevArsenal</span>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color:#111827;border:1px solid #1f2937;border-radius:16px;padding:48px 40px;">
              <!-- Heading -->
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#f9fafb;line-height:1.3;">
                Welcome aboard, ${userName}! 🚀
              </h1>
              <p style="margin:0 0 32px;font-size:16px;color:#9ca3af;line-height:1.6;">
                Your DevArsenal account is ready. You now have access to the premium developer toolkit 
                — everything you need to build and ship faster than ever.
              </p>
              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
                    <span style="color:#6366f1;font-size:18px;margin-right:12px;">✦</span>
                    <span style="color:#e5e7eb;font-size:14px;">Unlimited API access &amp; real-time analytics</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
                    <span style="color:#6366f1;font-size:18px;margin-right:12px;">✦</span>
                    <span style="color:#e5e7eb;font-size:14px;">Team collaboration &amp; role-based access control</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
                    <span style="color:#6366f1;font-size:18px;margin-right:12px;">✦</span>
                    <span style="color:#e5e7eb;font-size:14px;">Audit logs, billing portal &amp; priority support</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="color:#6366f1;font-size:18px;margin-right:12px;">✦</span>
                    <span style="color:#e5e7eb;font-size:14px;">Secure by default — SOC 2 compliant infrastructure</span>
                  </td>
                </tr>
              </table>
              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:linear-gradient(135deg,#4f46e5,#7c3aed);">
                    <a href="${dashboardUrl}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Open Your Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                © ${new Date().getFullYear()} DevArsenal. All rights reserved.<br/>
                <a href="https://devarsenal.com/unsubscribe" style="color:#6366f1;text-decoration:none;">Unsubscribe</a>
                &nbsp;·&nbsp;
                <a href="https://devarsenal.com/privacy" style="color:#6366f1;text-decoration:none;">Privacy Policy</a>
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
