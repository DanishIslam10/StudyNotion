exports.resetPasswordEmail = (name, resetUrl) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
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
                    <span style="font-size:12px;font-weight:600;color:#a5b4fc;">🔐 Password Reset</span>
                </div>

                <!-- Lock icon box -->
                <div style="display:inline-flex;width:64px;height:64px;background:#111c35;border:1px solid rgba(255,255,255,0.08);border-radius:18px;align-items:center;justify-content:center;margin:0 auto 20px;display:block;text-align:center;line-height:64px;font-size:28px;">
                    🔑
                </div>

                <!-- Heading -->
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#f1f5f9;line-height:1.2;">
                    Reset your password
                </h1>
                <p style="margin:10px 0 0;font-size:14px;color:#475569;line-height:1.6;">
                    We received a request to reset your LearnSpace password
                </p>
            </div>

            <!-- BODY -->
            <div style="padding:36px 40px;">

                <!-- Greeting -->
                <p style="margin:0 0 16px;font-size:16px;color:#94a3b8;line-height:1.6;">
                    Hey <strong style="color:#f1f5f9;">${name}</strong> 👋
                </p>
                <p style="margin:0 0 32px;font-size:15px;color:#94a3b8;line-height:1.7;">
                    No worries — it happens to the best of us! Click the button below to choose a new password. This link is valid for the next <strong style="color:#f1f5f9;">10 minutes</strong>.
                </p>

                <!-- CTA Button -->
                <div style="text-align:center;margin-bottom:28px;">
                    <a href="${resetUrl}"
                        style="display:inline-block;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);color:#000814;text-decoration:none;font-size:16px;font-weight:800;padding:16px 48px;border-radius:14px;letter-spacing:0.01em;">
                        Reset My Password →
                    </a>
                </div>

                <!-- Expiry bar -->
                <div style="text-align:center;margin-bottom:32px;">
                    <div style="display:inline-flex;align-items:center;gap:8px;background:#111c35;border:1px solid rgba(255,255,255,0.07);border-radius:999px;padding:8px 18px;">
                        <span style="font-size:13px;">⏱</span>
                        <span style="font-size:12px;color:#64748b;">Link expires in <strong style="color:#f1f5f9;">10 minutes</strong></span>
                    </div>
                </div>

                <!-- Fallback URL -->
                <div style="background:#111c35;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:18px 22px;margin-bottom:28px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                        Button not working? Copy this link
                    </p>
                    <p style="margin:0;font-size:12px;color:#818cf8;word-break:break-all;line-height:1.6;">
                        ${resetUrl}
                    </p>
                </div>

                <!-- Steps -->
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    What happens next
                </p>

                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">

                    <div style="display:flex;align-items:center;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <div style="min-width:28px;height:28px;background:linear-gradient(135deg,#ecec07,#a6ff5e);border-radius:8px;text-align:center;line-height:28px;">
                            <span style="font-size:13px;font-weight:800;color:#000814;">1</span>
                        </div>
                        <p style="margin:0;font-size:13px;color:#94a3b8;">Click <strong style="color:#f1f5f9;">Reset My Password</strong> above</p>
                    </div>

                    <div style="display:flex;align-items:center;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <div style="min-width:28px;height:28px;background:linear-gradient(135deg,#a6ff5e,#ffbc57);border-radius:8px;text-align:center;line-height:28px;">
                            <span style="font-size:13px;font-weight:800;color:#000814;">2</span>
                        </div>
                        <p style="margin:0;font-size:13px;color:#94a3b8;">Enter and confirm your <strong style="color:#f1f5f9;">new password</strong></p>
                    </div>

                    <div style="display:flex;align-items:center;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <div style="min-width:28px;height:28px;background:linear-gradient(135deg,#ffbc57,#ecec07);border-radius:8px;text-align:center;line-height:28px;">
                            <span style="font-size:13px;font-weight:800;color:#000814;">3</span>
                        </div>
                        <p style="margin:0;font-size:13px;color:#94a3b8;">Sign in with your <strong style="color:#f1f5f9;">new credentials</strong> and continue learning 🚀</p>
                    </div>

                </div>

                <!-- Security warning -->
                <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:16px 20px;margin-bottom:28px;">
                    <div style="display:flex;align-items:flex-start;gap:10px;">
                        <span style="font-size:16px;min-width:20px;">🔒</span>
                        <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;">
                            <strong style="color:#f87171;">Didn't request this?</strong> If you didn't ask to reset your password, you can safely ignore this email. Your account is secure and your password has <strong style="color:#f1f5f9;">not been changed</strong>.
                        </p>
                    </div>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:24px;"></div>

                <!-- Support -->
                <div style="text-align:center;">
                    <p style="margin:0 0 6px;font-size:13px;color:#475569;">
                        Need help accessing your account?
                    </p>
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
                    You received this because a password reset was requested for your account.
                </p>
            </div>

        </div>
    </div>
</body>
</html>`;
};