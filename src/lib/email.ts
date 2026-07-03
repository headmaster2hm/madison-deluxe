import type { BookingConfirmation } from "@/types/booking";

function formatDate(date: string): string {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildEmailHtml(confirmation: BookingConfirmation): string {
  const { booking, services, totalAmount, totalDuration, confirmationId, paidAt, paymentLast4 } =
    confirmation;
  const serviceRows = services
    .map(
      (s) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e4ebe4;">${s.name}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e4ebe4; text-align: center;">${s.durationLabel}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e4ebe4; text-align: right;">$${s.price}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; color: #2f3f2f; background: #f9f6f0; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <div style="background: #466146; color: #f9f6f0; padding: 32px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Madison Deluxe</h1>
      <p style="margin: 8px 0 0; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #d4a853;">Spa & Wellness Center</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="margin: 0 0 8px; font-size: 22px; color: #394e39;">Payment & Appointment Confirmed</h2>
      <p style="margin: 0 0 24px; color: #5a7a5a; font-size: 15px;">
        Dear ${booking.firstName} ${booking.lastName}, thank you for your booking. Your payment has been received and your appointment is confirmed.
      </p>

      <div style="background: #f4f7f4; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a967a;">Confirmation Number</p>
        <p style="margin: 0; font-size: 20px; font-weight: 600; color: #394e39;">${confirmationId}</p>
      </div>

      <h3 style="font-size: 16px; color: #394e39; margin: 0 0 12px;">Appointment Details</h3>
      <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
        <tr><td style="padding: 4px 0; color: #7a967a;">Date</td><td style="padding: 4px 0; text-align: right;">${formatDate(booking.date)}</td></tr>
        <tr><td style="padding: 4px 0; color: #7a967a;">Time</td><td style="padding: 4px 0; text-align: right;">${booking.time}</td></tr>
        <tr><td style="padding: 4px 0; color: #7a967a;">Phone</td><td style="padding: 4px 0; text-align: right;">${booking.phone}</td></tr>
      </table>

      <h3 style="font-size: 16px; color: #394e39; margin: 0 0 12px;">Services Booked</h3>
      <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="color: #7a967a; font-size: 12px; text-transform: uppercase;">
            <th style="text-align: left; padding-bottom: 8px;">Service</th>
            <th style="text-align: center; padding-bottom: 8px;">Duration</th>
            <th style="text-align: right; padding-bottom: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>${serviceRows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top: 12px; font-weight: 600;">Total (${totalDuration} min)</td>
            <td style="padding-top: 12px; text-align: right; font-weight: 600; font-size: 18px;">$${totalAmount}</td>
          </tr>
        </tfoot>
      </table>

      <h3 style="font-size: 16px; color: #394e39; margin: 0 0 12px;">Payment Information</h3>
      <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
        <tr><td style="padding: 4px 0; color: #7a967a;">Amount Paid</td><td style="padding: 4px 0; text-align: right; font-weight: 600;">$${totalAmount}</td></tr>
        <tr><td style="padding: 4px 0; color: #7a967a;">Card</td><td style="padding: 4px 0; text-align: right;">**** **** **** ${paymentLast4}</td></tr>
        <tr><td style="padding: 4px 0; color: #7a967a;">Paid On</td><td style="padding: 4px 0; text-align: right;">${new Date(paidAt).toLocaleString("en-US")}</td></tr>
        <tr><td style="padding: 4px 0; color: #7a967a;">Status</td><td style="padding: 4px 0; text-align: right; color: #466146; font-weight: 600;">Paid</td></tr>
      </table>

      ${booking.notes ? `<p style="font-size: 14px; color: #5a7a5a;"><strong>Special Requests:</strong> ${booking.notes}</p>` : ""}

      <p style="font-size: 13px; color: #7a967a; margin-top: 24px; line-height: 1.6;">
        We look forward to welcoming you. If you need to make changes, please contact us at
        <a href="mailto:hello@madisondeluxe.com" style="color: #466146;">hello@madisondeluxe.com</a>
        or call <a href="tel:+16025550123" style="color: #466146;">(602) 555-0123</a>.
      </p>
    </div>
    <div style="background: #f4f7f4; padding: 16px 32px; text-align: center; font-size: 12px; color: #7a967a;">
      Madison Deluxe Spa & Wellness Center · 123 Wellness Boulevard, Madison, WI 53703
    </div>
  </div>
</body>
</html>`;
}

function buildEmailText(confirmation: BookingConfirmation): string {
  const { booking, services, totalAmount, confirmationId, paidAt, paymentLast4 } =
    confirmation;

  const serviceList = services
    .map((s) => `  - ${s.name} (${s.durationLabel}) — $${s.price}`)
    .join("\n");

  return `Madison Deluxe Spa & Wellness Center
Payment & Appointment Confirmed

Dear ${booking.firstName} ${booking.lastName},

Thank you for your booking. Your payment has been received and your appointment is confirmed.

Confirmation Number: ${confirmationId}

APPOINTMENT DETAILS
Date: ${formatDate(booking.date)}
Time: ${booking.time}
Phone: ${booking.phone}

SERVICES BOOKED
${serviceList}

Total: $${totalAmount}

PAYMENT INFORMATION
Amount Paid: $${totalAmount}
Card: **** **** **** ${paymentLast4}
Paid On: ${new Date(paidAt).toLocaleString("en-US")}
Status: Paid

${booking.notes ? `Special Requests: ${booking.notes}\n` : ""}
We look forward to welcoming you!

Madison Deluxe Spa & Wellness Center
hello@madisondeluxe.com · (602) 555-0123`;
}

export async function sendConfirmationEmail(
  confirmation: BookingConfirmation
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Madison Deluxe <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("RESEND_API_KEY not set. Email preview:\n", buildEmailText(confirmation));
    return { sent: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [confirmation.booking.email],
        subject: `Appointment Confirmed — ${confirmation.confirmationId} | Madison Deluxe Spa`,
        html: buildEmailHtml(confirmation),
        text: buildEmailText(confirmation),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Resend API error:", body);
      return { sent: false, error: "Failed to send confirmation email" };
    }

    return { sent: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { sent: false, error: "Failed to send confirmation email" };
  }
}
