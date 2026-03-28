export interface SubscriptionStartedEmailProps {
  userName: string
  planName: string
  amount: number
  currency: string
  nextBillingDate: string
  dashboardUrl: string
}

export function subscriptionStartedEmailTemplate(props: SubscriptionStartedEmailProps): string {
  const { userName, planName, amount, currency, nextBillingDate, dashboardUrl } = props
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Subscription Started - DevArsenal</title>
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
              <div style="background:linear-gradient(135deg,#1e1b4b,#1f2937);border:1px solid #312e81;border-radius:12px;padding:20px;margin-bottom:32px;text-align:center;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#818cf8;text-transform:uppercase;letter-spacing:1px;">Active Plan</p>
                <p style="margin:0;font-size:32px;font-weight:700;color:#f9fafb;">${planName}</p>
              </div>
              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#f9fafb;">
                Your subscription is active, ${userName}!
              </h1>
              <p style="margin:0 0 32px;font-size:15px;color:#9ca3af;line-height:1.6;">
                Thank you for subscribing to DevArsenal ${planName}. Your workspace is fully unlocked 
                and ready to use.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:12px;padding:24px;margin-bottom:32px;">
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#6b7280;font-size:14px;">Plan</span>
                    <span style="float:right;color:#f9fafb;font-size:14px;font-weight:600;">${planName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #374151;">
                    <span style="color:#6b7280;font-size:14px;">Amount</span>
                    <span style="float:right;color:#f9fafb;font-size:14px;font-weight:600;">${formattedAmount}/mo</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #374151;">
                    <span style="color:#6b7280;font-size:14px;">Next billing date</span>
                    <span style="float:right;color:#f9fafb;font-size:14px;font-weight:600;">${nextBillingDate}</span>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:linear-gradient(135deg,#4f46e5,#7c3aed);">
                    <a href="${dashboardUrl}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Go to Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                © ${new Date().getFullYear()} DevArsenal. Questions?
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
