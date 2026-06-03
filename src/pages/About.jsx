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
        <div className="relative flex flex-col overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-20">

                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-150px] left-[-120px] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl"></div>

                    <div className="absolute bottom-[-120px] right-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">

                    {/* Badge */}
                    <div className="mb-6 flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-5 py-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>

                        <p className="text-sm font-medium text-indigo-300">
                            About StudyNotion
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-4xl text-4xl sm:text-6xl font-bold leading-tight text-white">
                        Driving Innovation in Online Education for a{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Brighter Future
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-8 max-w-3xl text-base sm:text-lg leading-relaxed text-[#9CA3AF]">
                        StudyNotion is redefining modern education by combining technology,
                        community, and practical learning experiences to help students and
                        instructors grow together.
                    </p>

                    {/* CTA */}
                    <div className="mt-10">
                        <CTAButton
                            children={"Start Learning"}
                            active={true}
                            linkTo={"/signup"}
                        />
                    </div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section className="mx-auto w-[92%] max-w-6xl py-10">

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

                    <p className="text-center text-2xl sm:text-4xl font-semibold leading-relaxed text-white">

                        <span className="text-indigo-400">“</span>

                        We combine{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            technology
                        </span>
                        ,{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            expertise
                        </span>
                        , and{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            community
                        </span>{" "}
                        to create an unparalleled educational experience.

                        <span className="text-indigo-400">”</span>
                    </p>
                </div>
            </section>

            {/* STORY / VISION / MISSION */}
            <section className="mx-auto flex w-[92%] max-w-6xl flex-col gap-8 py-14">

                {/* Story */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10">

                    <div className="max-w-4xl">

                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                            Our Story
                        </p>

                        <h2 className="mb-6 text-3xl sm:text-5xl font-bold text-white">
                            {ourFoundingStory.heading}
                        </h2>

                        <div className="space-y-5 text-[#9CA3AF] leading-relaxed text-base sm:text-lg">
                            <p>{ourFoundingStory.p1}</p>
                            <p>{ourFoundingStory.p2}</p>
                        </div>
                    </div>
                </div>

                {/* Vision + Mission */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Vision */}
                    <div className="rounded-3xl border border-orange-400/10 bg-orange-500/[0.03] backdrop-blur-xl p-8">

                        <div className="mb-4 h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                        </div>

                        <h3 className="mb-4 text-3xl font-bold text-orange-300">
                            {ourVision.heading1}
                        </h3>

                        <p className="leading-relaxed text-[#9CA3AF]">
                            {ourVision.p1}
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="rounded-3xl border border-cyan-400/10 bg-cyan-500/[0.03] backdrop-blur-xl p-8">

                        <div className="mb-4 h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-cyan-400"></div>
                        </div>

                        <h3 className="mb-4 text-3xl font-bold text-cyan-300">
                            {ourVision.heading2}
                        </h3>

                        <p className="leading-relaxed text-[#9CA3AF]">
                            {ourVision.p2}
                        </p>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-16">

                <div className="mx-auto grid w-[92%] max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">

                    {
                        statsData.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 text-center transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/[0.06]"
                            >

                                <p className="text-3xl sm:text-4xl font-bold text-white">
                                    {item.number}
                                </p>

                                <p className="mt-2 text-sm sm:text-base text-[#9CA3AF]">
                                    {item.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="mx-auto w-[92%] max-w-6xl py-10">

                <div className="mb-12 text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                        Why StudyNotion
                    </p>

                    <h2 className="text-4xl sm:text-5xl font-bold text-white">
                        Built for Modern Learning
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        gridSectionData.map((item, index) => (

                            item.boxPosition !== -1 && (

                                <div
                                    key={index}
                                    className="group rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/[0.06]"
                                >

                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">
                                        <div className="h-3 w-3 rounded-full bg-indigo-400"></div>
                                    </div>

                                    <h3 className="mb-4 text-2xl font-semibold text-white">
                                        {item.heading}
                                    </h3>

                                    <p className="leading-relaxed text-[#9CA3AF]">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        ))
                    }
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="mx-auto flex w-[92%] max-w-4xl flex-col items-center py-20">

                <div className="mb-10 text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                        Contact Us
                    </p>

                    <h2 className="text-4xl sm:text-5xl font-bold text-white">
                        Get in Touch
                    </h2>

                    <p className="mt-4 text-[#9CA3AF]">
                        We'd love to hear from you. Please fill out the form below.
                    </p>
                </div>

                <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-10">
                    <ContactUsForm />
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    )
};

export default About;
