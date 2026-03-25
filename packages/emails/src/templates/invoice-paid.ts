export interface InvoicePaidEmailProps {
  userName: string
  invoiceId: string
  amount: number
  currency: string
  paidAt: string
  invoiceUrl: string
}

export function invoicePaidEmailTemplate(props: InvoicePaidEmailProps): string {
  const { userName, invoiceId, amount, currency, paidAt, invoiceUrl } = props
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice Paid - DevArsenal</title>
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
                <div style="display:inline-block;background-color:#052e16;border:1px solid #166534;border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:24px;margin-bottom:16px;">✓</div>
                <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f9fafb;">Payment received</h1>
                <p style="margin:0;font-size:15px;color:#9ca3af;">Thanks ${userName}, your invoice has been paid.</p>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:12px;padding:24px;margin-bottom:32px;">
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#6b7280;font-size:14px;">Invoice ID</span>
                    <span style="float:right;color:#f9fafb;font-size:14px;font-family:monospace;">${invoiceId}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #374151;">
                    <span style="color:#6b7280;font-size:14px;">Amount paid</span>
                    <span style="float:right;color:#22c55e;font-size:16px;font-weight:700;">${formattedAmount}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-top:1px solid #374151;">
                    <span style="color:#6b7280;font-size:14px;">Payment date</span>
                    <span style="float:right;color:#f9fafb;font-size:14px;font-weight:600;">${paidAt}</span>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;border:1px solid #374151;">
                    <a href="${invoiceUrl}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#d1d5db;text-decoration:none;border-radius:8px;">
                      Download Invoice
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                © ${new Date().getFullYear()} DevArsenal. 
                <a href="mailto:billing@devarsenal.com" style="color:#6366f1;text-decoration:none;">billing@devarsenal.com</a>
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
