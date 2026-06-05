exports.contactFormEmailTemplateForUser = (
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background-color:#000814;font-family:'Segoe UI',Arial,sans-serif;">

    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

        <!-- CARD -->
        <div style="background-color:#0d1526;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

            <!-- TOP ACCENT LINE -->
            <div style="height:3px;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);"></div>

            <!-- HEADER -->
            <div style="padding:36px 40px 28px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">

                <!-- Logo -->
                <div style="display:inline-block;background:linear-gradient(135deg,#ecec07,#a6ff5e,#ffbc57);border-radius:12px;padding:8px 20px;margin-bottom:24px;">
                    <span style="font-size:18px;font-weight:800;color:#000814;letter-spacing:-0.5px;">LearnSpace</span>
                </div>

                <!-- Badge -->
                <div style="display:inline-block;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:999px;padding:5px 16px;margin-bottom:16px;">
                    <span style="font-size:12px;font-weight:600;color:#a5b4fc;">✦ Message Received</span>
                </div>

                <!-- Heading -->
                <h1 style="margin:0;font-size:26px;font-weight:800;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.2;">
                    We got your message!
                </h1>
            </div>

            <!-- BODY -->
            <div style="padding:36px 40px;">

                <!-- Greeting -->
                <p style="margin:0 0 16px;font-size:16px;color:#94a3b8;line-height:1.6;">
                    Hey <strong style="color:#f1f5f9;">${firstName} ${lastName}</strong> 👋
                </p>
                <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.7;">
                    Thank you for reaching out! We've received your message and our team will get back to you as soon as possible — usually within 24 hours.
                </p>

                <!-- Submission summary -->
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    Your submission
                </p>

                <div style="background:#111c35;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;margin-bottom:28px;">

                    <div style="display:flex;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                        <span style="min-width:120px;font-size:13px;color:#475569;font-weight:600;">Name</span>
                        <span style="font-size:13px;color:#f1f5f9;font-weight:500;">${firstName} ${lastName}</span>
                    </div>

                    <div style="display:flex;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                        <span style="min-width:120px;font-size:13px;color:#475569;font-weight:600;">Email</span>
                        <span style="font-size:13px;color:#a5b4fc;">${email}</span>
                    </div>

                    <div style="display:flex;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                        <span style="min-width:120px;font-size:13px;color:#475569;font-weight:600;">Phone</span>
                        <span style="font-size:13px;color:#f1f5f9;">${phoneNumber}</span>
                    </div>

                    <div style="padding:14px 20px;">
                        <span style="display:block;font-size:13px;color:#475569;font-weight:600;margin-bottom:8px;">Message</span>
                        <span style="font-size:13px;color:#94a3b8;line-height:1.7;">${message}</span>
                    </div>
                </div>

                <!-- What happens next -->
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    What happens next
                </p>

                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">

                    <div style="display:flex;align-items:flex-start;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <span style="font-size:16px;min-width:22px;">📬</span>
                        <div>
                            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f5f9;">Review</p>
                            <p style="margin:0;font-size:13px;color:#64748b;">Our team will review your message carefully.</p>
                        </div>
                    </div>

                    <div style="display:flex;align-items:flex-start;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <span style="font-size:16px;min-width:22px;">⚡</span>
                        <div>
                            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f5f9;">Response within 24 hrs</p>
                            <p style="margin:0;font-size:13px;color:#64748b;">We'll reply to <span style="color:#a5b4fc;">${email}</span> as quickly as we can.</p>
                        </div>
                    </div>

                </div>

                <!-- CTA -->
                <div style="text-align:center;margin-bottom:32px;">
                    <a href="${process.env.FRONT_END_URL}"
                        style="display:inline-block;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);color:#000814;text-decoration:none;font-size:15px;font-weight:800;padding:14px 36px;border-radius:14px;">
                        Back to LearnSpace →
                    </a>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:24px;"></div>

                <!-- Support -->
                <div style="text-align:center;">
                    <p style="margin:0 0 6px;font-size:13px;color:#475569;">Need urgent help?</p>
                    <a href="mailto:support@learnspace.com"
                        style="font-size:13px;color:#818cf8;text-decoration:none;font-weight:600;">
                        support@learnspace.com
                    </a>
                </div>
            </div>

            <!-- FOOTER -->
            <div style="padding:20px 40px;background:#060d1a;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                <p style="margin:0 0 4px;font-size:12px;color:#334155;">
                    © ${new Date().getFullYear()} LearnSpace. All rights reserved.
                </p>
                <p style="margin:0;font-size:11px;color:#1e293b;">
                    You received this because you submitted the contact form on LearnSpace.
                </p>
            </div>

        </div>
    </div>
</body>
</html>`;
};


exports.contactFormEmailTemplateForAdmin = (
    firstName,
    lastName,
    email,
    phoneNumber,
    message
) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#000814;font-family:'Segoe UI',Arial,sans-serif;">

    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

        <!-- CARD -->
        <div style="background-color:#0d1526;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

            <!-- TOP ACCENT LINE — indigo for admin/internal -->
            <div style="height:3px;background:linear-gradient(to right,#6366f1,#8b5cf6,#06b6d4);"></div>

            <!-- HEADER -->
            <div style="padding:36px 40px 28px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">

                <!-- Logo -->
                <div style="display:inline-block;background:linear-gradient(135deg,#ecec07,#a6ff5e,#ffbc57);border-radius:12px;padding:8px 20px;margin-bottom:24px;">
                    <span style="font-size:18px;font-weight:800;color:#000814;letter-spacing:-0.5px;">LearnSpace</span>
                </div>

                <!-- Badge -->
                <div style="display:inline-block;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:999px;padding:5px 16px;margin-bottom:16px;">
                    <span style="font-size:12px;font-weight:600;color:#a5b4fc;">⚡ New Inquiry</span>
                </div>

                <h1 style="margin:0;font-size:24px;font-weight:800;color:#f1f5f9;line-height:1.2;">
                    New Contact Form Submission
                </h1>
                <p style="margin:8px 0 0;font-size:13px;color:#475569;">
                    Someone just reached out via the LearnSpace contact form.
                </p>
            </div>

            <!-- BODY -->
            <div style="padding:36px 40px;">

                <!-- Sender details -->
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    Sender Details
                </p>

                <div style="background:#111c35;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;margin-bottom:24px;">

                    <div style="display:flex;align-items:center;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                        <span style="min-width:120px;font-size:13px;color:#475569;font-weight:600;">Name</span>
                        <strong style="font-size:14px;color:#f1f5f9;">${firstName} ${lastName}</strong>
                    </div>

                    <div style="display:flex;align-items:center;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);">
                        <span style="min-width:120px;font-size:13px;color:#475569;font-weight:600;">Email</span>
                        <a href="mailto:${email}" style="font-size:13px;color:#a5b4fc;text-decoration:none;font-weight:500;">${email}</a>
                    </div>

                    <div style="display:flex;align-items:center;padding:14px 20px;">
                        <span style="min-width:120px;font-size:13px;color:#475569;font-weight:600;">Phone</span>
                        <span style="font-size:13px;color:#f1f5f9;">${phoneNumber}</span>
                    </div>
                </div>

                <!-- Message -->
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    Message
                </p>

                <div style="background:#111c35;border:1px solid rgba(255,255,255,0.07);border-left:3px solid #a6ff5e;border-radius:0 16px 16px 0;padding:20px 24px;margin-bottom:28px;">
                    <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.8;">${message}</p>
                </div>

                <!-- Action prompt -->
                <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:14px;padding:16px 20px;margin-bottom:28px;text-align:center;">
                    <p style="margin:0;font-size:14px;color:#a5b4fc;font-weight:500;">
                        Please follow up with <strong>${firstName}</strong> at <a href="mailto:${email}" style="color:#818cf8;text-decoration:none;">${email}</a> at your earliest convenience.
                    </p>
                </div>

                <!-- Reply CTA -->
                <div style="text-align:center;margin-bottom:24px;">
                    <a href="mailto:${email}?subject=Re: Your LearnSpace Inquiry&body=Hi ${firstName},"
                        style="display:inline-block;background:linear-gradient(to right,#6366f1,#8b5cf6,#06b6d4);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:14px;">
                        Reply to ${firstName} →
                    </a>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:20px;"></div>

                <p style="margin:0;text-align:center;font-size:12px;color:#334155;">
                    Submitted on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
            </div>

            <!-- FOOTER -->
            <div style="padding:20px 40px;background:#060d1a;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                <p style="margin:0 0 4px;font-size:12px;color:#334155;">
                    © ${new Date().getFullYear()} LearnSpace Admin Panel
                </p>
                <p style="margin:0;font-size:11px;color:#1e293b;">
                    Internal notification — do not reply directly to this email.
                </p>
            </div>

        </div>
    </div>
</body>
</html>`;
};