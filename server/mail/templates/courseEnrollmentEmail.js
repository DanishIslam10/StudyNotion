exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Enrollment Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#000814;font-family:'Segoe UI',Arial,sans-serif;">

    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

        <!-- CARD -->
        <div style="background-color:#0d1526;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

            <!-- TOP ACCENT LINE -->
            <div style="height:3px;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);"></div>

            <!-- HEADER -->
            <div style="padding:36px 40px 28px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">

                <!-- Logo text (SVG doesn't render in most email clients) -->
                <div style="display:inline-block;background:linear-gradient(135deg,#ecec07,#a6ff5e,#ffbc57);border-radius:12px;padding:8px 20px;margin-bottom:24px;">
                    <span style="font-size:18px;font-weight:800;color:#000814;letter-spacing:-0.5px;">LearnSpace</span>
                </div>

                <!-- Badge -->
                <div style="display:inline-block;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:999px;padding:5px 16px;margin-bottom:16px;">
                    <span style="font-size:12px;font-weight:600;color:#a5b4fc;">✦ Enrollment Confirmed</span>
                </div>

                <!-- Heading -->
                <h1 style="margin:0;font-size:28px;font-weight:800;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.2;">
                    You're enrolled!
                </h1>
            </div>

            <!-- BODY -->
            <div style="padding:36px 40px;">

                <!-- Greeting -->
                <p style="margin:0 0 16px;font-size:16px;color:#94a3b8;line-height:1.6;">
                    Hey <strong style="color:#f1f5f9;">${name}</strong> 👋
                </p>

                <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.7;">
                    Congratulations! You've successfully enrolled in the course below. Your learning journey starts now — we're thrilled to have you on board.
                </p>

                <!-- Course pill -->
                <div style="background:#111c35;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px 24px;margin-bottom:28px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                        Enrolled Course
                    </p>
                    <p style="margin:0;font-size:18px;font-weight:700;color:#f1f5f9;line-height:1.4;">
                        ${courseName}
                    </p>
                </div>

                <!-- What's next -->
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;">
                    What's next
                </p>

                <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px;">

                    <div style="display:flex;align-items:flex-start;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <span style="font-size:18px;min-width:24px;">📚</span>
                        <div>
                            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f5f9;">Access your course</p>
                            <p style="margin:0;font-size:13px;color:#64748b;">Head to your dashboard to start watching lectures and completing lessons.</p>
                        </div>
                    </div>

                    <div style="display:flex;align-items:flex-start;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <span style="font-size:18px;min-width:24px;">🏆</span>
                        <div>
                            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f5f9;">Earn your certificate</p>
                            <p style="margin:0;font-size:13px;color:#64748b;">Complete the course to receive your certificate of completion.</p>
                        </div>
                    </div>

                    <div style="display:flex;align-items:flex-start;gap:12px;background:#111c35;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;">
                        <span style="font-size:18px;min-width:24px;">📱</span>
                        <div>
                            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#f1f5f9;">Learn anywhere</p>
                            <p style="margin:0;font-size:13px;color:#64748b;">Access your course on mobile, tablet, or desktop — anytime, anywhere.</p>
                        </div>
                    </div>

                </div>

                <!-- CTA Button -->
                <div style="text-align:center;margin-bottom:32px;">
                    <a href="${process.env.FRONT_END_URL}/profile/enrolled-courses"
                        style="display:inline-block;background:linear-gradient(to right,#ecec07,#a6ff5e,#ffbc57);color:#000814;text-decoration:none;font-size:15px;font-weight:800;padding:14px 36px;border-radius:14px;letter-spacing:0.01em;">
                        Go to My Courses →
                    </a>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:24px;"></div>

                <!-- Support -->
                <div style="text-align:center;">
                    <p style="margin:0 0 6px;font-size:13px;color:#475569;">
                        Need help? We're always here for you.
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
                    You received this email because you enrolled in a course on LearnSpace.
                </p>
            </div>

        </div>

    </div>
</body>
</html>`;
};