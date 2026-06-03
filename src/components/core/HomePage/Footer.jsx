import React, { useState } from "react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

// ── Data (drop-in replacement for your footer-links.js imports) ──────────────
const FooterData1 = [
  {
    title: "Company",
    links: [
      { title: "About", link: "/about" },
      { title: "Careers", link: "/careers" },
      { title: "Affiliates", link: "/affiliates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Articles", link: "/articles" },
      { title: "Blog", link: "/blog" },
      { title: "Cheat Sheet", link: "/cheat-sheet" },
      { title: "Code Challenges", link: "/code-challenges" },
      { title: "Docs", link: "/docs" },
      { title: "Projects", link: "/projects" },
      { title: "Videos", link: "/videos" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Forums", link: "/forums" },
      { title: "Chapters", link: "/chapters" },
      { title: "Events", link: "/events" },
    ],
  },
  {
    title: "Plans",
    links: [
      { title: "Paid memberships", link: "/paid-memberships" },
      { title: "For students", link: "/for-students" },
      { title: "Business solutions", link: "/business-solutions" },
    ],
  },
  {
    title: "Support",
    links: [{ title: "Help Center", link: "/help-center" }],
  },
];

const FooterData2 = [
  {
    title: "Subjects",
    links: [
      { title: "AI", link: "/ai" },
      { title: "Cloud Computing", link: "/cloud-computing" },
      { title: "Computer Science", link: "/computer-science" },
      { title: "Cybersecurity", link: "/cybersecurity" },
      { title: "Data Science", link: "/data-science" },
      { title: "Data Analytics", link: "/data-analytics" },
      { title: "DevOps", link: "/devops" },
      { title: "Machine Learning", link: "/machine-learning" },
      { title: "Web Development", link: "/web-development" },
    ],
  },
  {
    title: "Languages",
    links: [
      { title: "Python", link: "/python" },
      { title: "JavaScript", link: "/javascript" },
      { title: "C++", link: "/c++" },
      { title: "Java", link: "/java" },
      { title: "SQL", link: "/sql" },
      { title: "Go", link: "/go" },
      { title: "HTML & CSS", link: "/html-css" },
      { title: "Swift", link: "/swift" },
    ],
  },
  {
    title: "Career building",
    links: [
      { title: "Career paths", link: "/career-paths" },
      { title: "Interview prep", link: "/interview-prep" },
      { title: "Career services", link: "/career-services" },
      { title: "Full Catalog", link: "/full-catalog" },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const GradientText = ({ children, className = "" }) => (
  <span
    className={className}
    style={{
      background: "linear-gradient(90deg, #ecec07, #a6ff5e, #ffbc57)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </span>
);

const FooterColumn = ({ data }) => (
  <div className="flex flex-col gap-3 min-w-[120px]">
    <p
      className="text-xs font-semibold tracking-widest uppercase mb-1"
      style={{
        background: "linear-gradient(90deg, #ecec07, #a6ff5e, #ffbc57)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {data.title}
    </p>
    {data.links.map((item, index) => (
      <a
        key={index}
        href={item.link}
        className="text-sm text-[#6E727F] hover:text-white transition-colors duration-200 w-fit relative group"
      >
        {item.title}
        <span
          className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
          style={{
            background: "linear-gradient(90deg, #ecec07, #a6ff5e)",
          }}
        />
      </a>
    ))}
  </div>
);

const SocialButton = ({ icon: Icon, href = "#", label }) => (
  <a
    href={href}
    aria-label={label}
    className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[#2C333F] text-[#6E727F] hover:text-[#161D29] hover:border-transparent transition-all duration-300 group overflow-hidden"
  >
    <span
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: "linear-gradient(135deg, #ecec07, #a6ff5e, #ffbc57)",
      }}
    />
    <Icon className="relative z-10 text-lg" />
  </a>
);

// ── Main Footer ───────────────────────────────────────────────────────────────
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="w-full relative overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Subtle gradient orb top-left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #a6ff5e 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Subtle gradient orb bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #ffbc57 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top accent line */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #ecec07 20%, #a6ff5e 50%, #ffbc57 80%, transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">

        {/* ── Top strip: brand + newsletter ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-14">

          {/* Brand block */}
          <div className="flex flex-col gap-4 max-w-xs">
            {/* Logo text */}
            <div className="flex items-center gap-3">
              {/* Icon mark */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #ecec07, #a6ff5e, #ffbc57)",
                }}
              >
                {/* Book icon SVG */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="7" width="6" height="9" rx="1" fill="#1a1a1a" opacity="0.85" />
                  <rect x="11" y="7" width="6" height="9" rx="1" fill="#1a1a1a" opacity="0.6" />
                  <rect x="3" y="4" width="13" height="2" rx="0.5" fill="#1a1a1a" opacity="0.85" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Learn<GradientText>Space</GradientText>
              </span>
            </div>

            <p className="text-sm text-[#6E727F] leading-relaxed">
              The platform that helps you learn, grow, and build a career you love — at your own pace.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              <SocialButton icon={IoLogoGithub} label="GitHub" href="#" />
              <SocialButton icon={IoLogoLinkedin} label="LinkedIn" href="#" />
              <SocialButton icon={IoLogoTwitter} label="Twitter" href="#" />
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 max-w-sm w-full">
            <p className="text-sm font-semibold text-white">
              Stay in the loop
            </p>
            <p className="text-xs text-[#6E727F]">
              Get the latest courses, tutorials, and updates delivered to your inbox.
            </p>
            {subscribed ? (
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(166,255,94,0.08)",
                  border: "1px solid rgba(166,255,94,0.25)",
                  color: "#a6ff5e",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="#a6ff5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-[#4A4F5A] outline-none transition-all duration-200"
                  style={{
                    background: "#161D29",
                    border: "1px solid #2C333F",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#a6ff5e";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#2C333F";
                  }}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a1a] transition-all duration-200 hover:opacity-90 active:scale-95 flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #ecec07, #a6ff5e, #ffbc57)",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-14">
          {FooterData1.map((item, index) => (
            <FooterColumn key={index} data={item} />
          ))}
        </div>

        {/* Thin divider */}
        <div
          className="w-full h-px mb-10"
          style={{ background: "#2C333F" }}
        />

        {/* ── Second link row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
          {FooterData2.map((item, index) => (
            <FooterColumn key={index} data={item} />
          ))}
        </div>

        {/* Thin divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "#2C333F" }}
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A4F5A]">

          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} LearnSpace. Made with</span>
            <span className="text-red-400 mx-0.5">♥</span>
            <span>by</span>
            <span
              className="font-semibold ml-1"
              style={{
                background: "linear-gradient(90deg, #ecec07, #a6ff5e, #ffbc57)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Danish Islam
            </span>
          </div>

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Cookie Policy", "Terms of Service"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              )
            )}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
