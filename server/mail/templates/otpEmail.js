exports.otpEmail = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background-color:#000814;font-family:'Segoe UI',Arial,sans-serif;">

    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

        <!-- CARD -->
        <div style="background-color:#0d1526;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

            <!-- TOP ACCENT LINE -->
            <div style="height:3px;background:linear-gradient(to right,#6366f1,#8b5cf6,#06b6d4);"></div>

            <!-- HEADER -->
            <div style="padding:36px 40px 28px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">

                <!-- Logo -->
                <div style="display:inline-block;background:linear-gradient(135deg,#ecec07,#a6ff5e,#ffbc57);border-radius:12px;padding:8px 20px;margin-bottom:24px;">
                    <span style="font-size:18px;font-weight:800;color:#000814;letter-spacing:-0.5px;">LearnSpace</span>
                </div>

                <!-- Badge -->
                <div style="display:inline-block;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:999px;padding:5px 16px;margin-bottom:16px;">
                    <span style="font-size:12px;font-weight:600;color:#a5b4fc;">✦ Email Verification</span>
                </div>

                <!-- Heading -->
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#f1f5f9;line-height:1.2;">
                    Verify your email address
                </h1>
                <p style="margin:10px 0 0;font-size:14px;color:#475569;line-height:1.6;">
                    Use the code below to complete your sign up
                </p>
            </div>

            <!-- BODY -->
            <div style="padding:36px 40px;">

                <!-- Intro -->
                <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.7;">
                    Welcome to LearnSpace! You're almost there. Enter the verification code below on the sign up page to confirm your email address and activate your account.
                </p>

                <!-- OTP BOX -->
                <div style="text-align:center;margin-bottom:12px;">
                    <div style="display:inline-block;background:#111c35;border:1px solid rgba(166,255,94,0.25);border-radius:20px;padding:28px 48px;">

                        <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#64748b;">
                            Your verification code
                        </p>

                        <!-- OTP digits -->
                        <div style="display:flex;gap:10px;justify-content:center;margin-bottom:12px;">
                            ${otp.toString().split("").map(digit => `
                            <div style="width:44px;height:52px;background:#0d1526;border:1px solid rgba(166,255,94,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                                <span style="font-size:26px;font-weight:800;color:#a6ff5e;font-family:'Courier New',monospace;">${digit}</span>
                            </div>`).join("")}
                        </div>

                        <p style="margin:0;font-size:12px;color:#334155;">
                            Expires in <strong style="color:#f1f5f9;">10 minutes</strong>
                        </p>
                    </div>
                </div>

                <!-- Progress bar hint -->
                <div style="background:#111c35;border-radius:999px;height:4px;margin:0 auto 32px;max-width:240px;overflow:hidden;">
                    <div style="background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);height:100%;width:100%;border-radius:999px;"></div>
                </div>

                <!-- Steps -->
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    How to verify
                </p>

                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">

                    <div style="display:flex;align-items:center;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <div style="min-width:28px;height:28px;background:linear-gradient(135deg,#ecec07,#a6ff5e);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                            <span style="font-size:13px;font-weight:800;color:#000814;">1</span>
                        </div>
                        <p style="margin:0;font-size:13px;color:#94a3b8;">Go back to the <strong style="color:#f1f5f9;">LearnSpace sign up page</strong></p>
                    </div>

                    <div style="display:flex;align-items:center;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <div style="min-width:28px;height:28px;background:linear-gradient(135deg,#a6ff5e,#ffbc57);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                            <span style="font-size:13px;font-weight:800;color:#000814;">2</span>
                        </div>
                        <p style="margin:0;font-size:13px;color:#94a3b8;">Enter the <strong style="color:#f1f5f9;">6-digit code</strong> in the verification field</p>
                    </div>

                    <div style="display:flex;align-items:center;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <div style="min-width:28px;height:28px;background:linear-gradient(135deg,#ffbc57,#ecec07);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                            <span style="font-size:13px;font-weight:800;color:#000814;">3</span>
                        </div>
                        <p style="margin:0;font-size:13px;color:#94a3b8;">Hit <strong style="color:#f1f5f9;">Verify Email</strong> and start learning 🚀</p>
                    </div>

                </div>

                <!-- Security warning -->
                <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:16px 20px;margin-bottom:28px;">
                    <div style="display:flex;align-items:flex-start;gap:10px;">
                        <span style="font-size:16px;min-width:20px;">🔒</span>
                        <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;">
                            <strong style="color:#f87171;">Never share this code</strong> with anyone. LearnSpace will never ask for your OTP via phone, chat, or email. If you didn't request this, you can safely ignore it.
                        </p>
                    </div>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:24px;"></div>

                <!-- Support -->
                <div style="text-align:center;">
                    <p style="margin:0 0 6px;font-size:13px;color:#475569;">Having trouble? We're here to help.</p>
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
                    You received this because an account was being created with this email address.
                </p>
            </div>

        </div>
    </div>
</body>
</html>`;
};