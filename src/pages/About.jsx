import React from "react"
import { ourFoundingStory } from "../data/aboutpage";
import { ourVision } from "../data/aboutpage";
import { statsData } from "../data/aboutpage";
import { gridSectionData } from "../data/aboutpage";
import CTAButton from "../components/core/HomePage/CTAButton";
import Footer from "../components/core/HomePage/Footer";
import ContactUsForm from "../components/common/ContactUsForm";

const About = (props) => {
    return (
        <div className="relative flex flex-col overflow-hidden bg-[#000814] text-white">

            {/* BACKGROUND GLOWS */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-150px] left-[-120px] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute top-[30%] right-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-[-100px] left-[20%] h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            {/* ── HERO ── */}
            <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-20">
                <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">

                    <div className="mb-6 flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-5 py-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <p className="text-xs font-medium text-indigo-300">About LearnSpace</p>
                    </div>

                    <h1 className="max-w-4xl text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
                        Driving Innovation in Online Education for a{" "}
                        <span className="bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                            Brighter Future
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
                        LearnSpace is redefining modern education by combining technology,
                        community, and practical learning to help students and instructors grow together.
                    </p>

                    <div className="mt-10">
                        <CTAButton active={true} linkTo="/signup">
                            Start Learning
                        </CTAButton>
                    </div>
                </div>
            </section>

            {/* ── QUOTE ── */}
            <section className="mx-auto w-[92%] max-w-6xl py-10">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />
                    <div className="p-8 sm:p-12">
                        <p className="text-center text-2xl sm:text-3xl font-semibold leading-relaxed text-slate-300">
                            <span className="text-[#a6ff5e] text-4xl leading-none">"</span>
                            {" "}We combine{" "}
                            <span className="bg-gradient-to-r from-[#ecec07] to-[#a6ff5e] bg-clip-text text-transparent font-bold">technology</span>
                            ,{" "}
                            <span className="bg-gradient-to-r from-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent font-bold">expertise</span>
                            , and{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">community</span>
                            {" "}to create an unparalleled educational experience.
                            {" "}<span className="text-[#a6ff5e] text-4xl leading-none">"</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ── STORY / VISION / MISSION ── */}
            <section className="mx-auto flex w-[92%] max-w-6xl flex-col gap-5 py-14">

                {/* Story */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                    <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
                    <div className="p-8 sm:p-10 max-w-4xl">

                        <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5 mb-5">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            <p className="text-xs font-medium text-indigo-300">Our Story</p>
                        </div>

                        <h2 className="mb-6 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                            {ourFoundingStory.heading}
                        </h2>

                        <div className="flex flex-col gap-4 text-slate-400 leading-relaxed text-base sm:text-lg">
                            <p>{ourFoundingStory.p1}</p>
                            <p>{ourFoundingStory.p2}</p>
                        </div>
                    </div>
                </div>

                {/* Vision + Mission */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* Vision */}
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                        <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />
                        <div className="p-8">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                                <svg className="h-5 w-5 text-[#a6ff5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">{ourVision.heading1}</h3>
                            <p className="leading-relaxed text-slate-400 text-sm sm:text-base">{ourVision.p1}</p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
                        <div className="p-8">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">{ourVision.heading2}</h3>
                            <p className="leading-relaxed text-slate-400 text-sm sm:text-base">{ourVision.p2}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="py-10">
                <div className="mx-auto grid w-[92%] max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
                    {statsData.map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526]
            p-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.6)]
            transition-all duration-300 hover:border-indigo-500/20 hover:bg-[#111c35]"
                        >
                            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                                {item.number}
                            </p>
                            <p className="mt-2 text-xs sm:text-sm text-slate-500">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES GRID ── */}
            <section className="mx-auto w-[92%] max-w-6xl py-14">

                <div className="mb-12 text-center">
                    <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <p className="text-xs font-medium text-indigo-300">Why LearnSpace</p>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                        Built for Modern Learning
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridSectionData.map((item, index) => (
                        item.boxPosition !== -1 && (
                            <div
                                key={index}
                                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526]
              p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)] transition-all duration-300
              hover:border-indigo-500/20 hover:bg-[#111c35]"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35] group-hover:border-indigo-500/30 transition-all duration-300">
                                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
                                </div>
                                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-white">{item.heading}</h3>
                                <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* ── CONTACT SECTION ── */}
            <section className="mx-auto w-[92%] max-w-4xl py-16">

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

                    <div className="p-8 sm:p-10">

                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                <p className="text-xs font-medium text-indigo-300">Contact Us</p>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                Get in Touch
                            </h2>

                            <p className="mt-3 text-sm text-slate-500">
                                We'd love to hear from you. Fill out the form and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        <ContactUsForm />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
};

export default About;
