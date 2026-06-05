import React from "react"
import ContactUsForm from "../components/common/ContactUsForm";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaGlobeAsia } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import Footer from "../components/core/HomePage/Footer";

const contactUsData = [
    {
        heading: "Chat with us",
        description: "Our support team is available to help you with any questions.",
        contactInfo: "support@learnspace.com",
        icon: <HiOutlineChatBubbleLeftRight />,
    },
    {
        heading: "Visit us",
        description: "Come say hello at our office — we'd love to meet you.",
        contactInfo: "Connaught Place, New Delhi, India 110001",
        icon: <FaGlobeAsia />,
    },
    {
        heading: "Call us",
        description: "Mon – Fri, 9am to 6pm IST. We're happy to talk.",
        contactInfo: "+91 98765 43210",
        icon: <IoCallOutline />,
    },
]

const ContactUs = () => {
    return (
        <div className="relative flex flex-col items-center overflow-hidden bg-[#000814] text-white">

            {/* BACKGROUND GLOWS */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-120px] left-[-100px] h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute top-[40%] right-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-[-100px] left-[30%] h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 my-16 flex w-[92%] max-w-7xl flex-col gap-6 lg:flex-row">

                {/* ── LEFT — CONTACT INFO ── */}
                <div className="w-full lg:w-[35%]">
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)] h-full">
                        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                        <div className="p-6 sm:p-8">

                            {/* HEADING */}
                            <div className="mb-8">
                                <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                    <p className="text-xs font-medium text-indigo-300">Contact Information</p>
                                </div>

                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                    Let's Connect
                                </h2>

                                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                    Reach out anytime. We're here to help with learning,
                                    partnerships, or support.
                                </p>
                            </div>

                            {/* CONTACT ITEMS */}
                            <div className="flex flex-col gap-4">
                                {contactUsData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-[#111c35]
                                            p-4 transition-all duration-200
                                            hover:border-indigo-500/20 hover:bg-[#152040]"
                                    >
                                        {/* ICON */}
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                                            border border-white/10 bg-[#0d1526] text-lg text-indigo-400
                                            transition-all duration-200 group-hover:border-indigo-500/30">
                                            {item.icon}
                                        </div>

                                        {/* TEXT */}
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <p className="text-sm font-semibold text-white">{item.heading}</p>
                                            <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                                            <p className="text-xs font-semibold text-[#a6ff5e] mt-0.5 truncate">
                                                {item.contactInfo}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* DIVIDER */}
                            <div className="my-7 border-t border-white/[0.06]" />

                            {/* RESPONSE TIME NOTE */}
                            <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-[#111c35] p-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0d1526]">
                                    <svg className="h-4 w-4 text-[#a6ff5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white">Typical response time</p>
                                    <p className="text-xs text-slate-500 mt-0.5">We usually reply within <span className="text-[#a6ff5e] font-semibold">24 hours</span> on business days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT — FORM ── */}
                <div className="w-full lg:w-[65%]">
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                        <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

                        {/* TOP SECTION */}
                        <div className="border-b border-white/[0.06] p-6 sm:p-8">

                            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                <p className="text-xs font-medium text-indigo-300">Send us a message</p>
                            </div>

                            <h1 className="max-w-2xl text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                                Got a question?{" "}
                                <span className="bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                                    We'd love to hear it.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                                Whether you're a student, instructor, or organization —
                                fill out the form and our team will get back to you within 24 hours.
                            </p>

                            {/* STATS ROW */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                {[
                                    { value: "24hr", label: "Response time" },
                                    { value: "50K+", label: "Happy learners" },
                                    { value: "4.9★", label: "Support rating" },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111c35] px-4 py-2">
                                        <p className="text-sm font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-slate-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="p-6 sm:p-8">
                            <ContactUsForm />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ContactUs;