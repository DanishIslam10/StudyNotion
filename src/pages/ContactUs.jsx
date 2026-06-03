import React from "react"
import ContactUsForm from "../components/common/ContactUsForm";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaGlobeAsia } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import Footer from "../components/core/HomePage/Footer";

const contactUsData = [
    {
        heading: "Chat with us",
        description: "Our friendly team is here to help.",
        contactInfo: "somebody@fun.com",
        icon: <HiOutlineChatBubbleLeftRight />
    },
    {
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        contactInfo: "Here is the location/ address",
        icon: <FaGlobeAsia />,
    },
    {
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm.",
        contactInfo: "+123 456 7890",
        icon: <IoCallOutline />,
    },
]

const ContactUs = (props) => {
    return (
        <div className="relative flex flex-col items-center overflow-hidden text-white">

            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-120px] left-[-100px] h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-3xl"></div>

                <div className="absolute bottom-[-120px] right-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl"></div>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 my-16 flex w-[92%] max-w-7xl flex-col gap-8 lg:flex-row">

                {/* LEFT CONTACT INFO */}
                <div className="w-full lg:w-[35%]">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

                        {/* HEADING */}
                        <div className="mb-8">

                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                                Contact Information
                            </p>

                            <h2 className="text-3xl font-bold text-white">
                                Let's Connect
                            </h2>

                            <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">
                                Reach out to us anytime. We're here to help you with learning,
                                partnerships, or support.
                            </p>
                        </div>

                        {/* CONTACT ITEMS */}
                        <div className="space-y-6">

                            {
                                contactUsData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/[0.05]"
                                    >

                                        {/* ICON */}
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl text-indigo-300 transition-all duration-300 group-hover:scale-105">

                                            {item.icon}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex flex-col">

                                            <p className="text-lg font-semibold text-white">
                                                {item.heading}
                                            </p>

                                            <p className="mt-1 text-sm leading-relaxed text-[#9CA3AF]">
                                                {item.description}
                                            </p>

                                            <p className="mt-2 text-sm font-medium text-indigo-300">
                                                {item.contactInfo}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM SECTION */}
                <div className="w-full lg:w-[65%]">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden">

                        {/* TOP SECTION */}
                        <div className="border-b border-white/10 p-6 sm:p-8">

                            {/* Badge */}
                            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1">

                                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>

                                <p className="text-xs font-medium text-cyan-300">
                                    Let's Build Something Amazing
                                </p>
                            </div>

                            {/* Heading */}
                            <h1 className="max-w-3xl text-3xl sm:text-5xl font-bold leading-tight text-white">
                                Got an Idea?
                                <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    {" "}Let's Team Up
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9CA3AF]">
                                Tell us more about yourself and what you have in mind.
                                Whether you're a student, instructor, or organization —
                                we'd love to hear from you.
                            </p>
                        </div>

                        {/* FORM */}
                        <div className="p-6 sm:p-8">
                            <ContactUsForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
};

export default ContactUs;
