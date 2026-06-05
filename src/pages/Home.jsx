import React from "react"
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../components/core/HomePage/CTAButton";
import Footer from "../components/core/HomePage/Footer";


const Home = (props) => {

    return (

        <div className="relative flex flex-col overflow-hidden text-white">

            {/* BACKGROUND GLOWS */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-200px] left-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute top-[35%] right-[-150px] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-[-150px] left-[20%] h-[320px] w-[320px] rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            {/* ── HERO ── */}
            <section className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 py-20">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

                    {/* BADGE */}
                    <p className="mb-6 inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                        The future of learning
                    </p>

                    {/* HEADING */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                        Learn, Build &amp; Master{" "}
                        <span className="bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                            Tech Skills
                        </span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#9CA3AF]">
                        Learn modern development skills through interactive lessons,
                        real-world projects, and AI-powered experiences — all in one platform.
                    </p>

                    {/* CTA BUTTONS */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className="flex items-center gap-2">
                                <p>Start Learning</p>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkTo={"/catalog"}>
                            Explore Courses
                        </CTAButton>
                    </div>

                    {/* CODE WINDOW */}
                    <div className="mt-16 sm:mt-20 w-full">
                        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                            {/* TOP BAR */}
                            <div className="flex items-center gap-2 border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
                                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400" />
                                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400" />
                                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400" />
                                <p className="ml-3 text-xs sm:text-sm text-[#9CA3AF]">learning.js</p>
                            </div>

                            {/* CODE BLOCK */}
                            <div className="overflow-x-auto p-4 sm:p-8">
                                <pre className="text-left text-xs sm:text-sm leading-7 sm:leading-8 text-[#D1D5DB]">
                                    {`const future = await LearnSpace.learn({
  skills: ["React", "Node.js", "AI"],
  projects: true,
  mentorship: true,
  careerGrowth: true
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="relative z-10 py-16 sm:py-24">
                <div className="mx-auto w-[92%] max-w-7xl">

                    {/* HEADING */}
                    <div className="mb-12 sm:mb-16 text-center">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                            Why LearnSpace
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white">
                            Built for Modern Learning
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[#9CA3AF] text-base sm:text-lg leading-relaxed">
                            Everything you need to learn, build, and grow —
                            designed for the next generation of developers.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { title: "Interactive Learning", desc: "Practice with real-world coding exercises and projects." },
                            { title: "AI-Powered Guidance", desc: "Get personalized help and intelligent recommendations." },
                            { title: "Industry Curriculum", desc: "Learn technologies used by top engineering teams." },
                            { title: "Project-Based Growth", desc: "Build portfolio-worthy applications while learning." },
                            { title: "Flexible Learning", desc: "Study at your own pace from anywhere in the world." },
                            { title: "Career Ready", desc: "Develop practical skills for high-demand tech roles." },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04]
              p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300
              hover:border-indigo-400/20 hover:bg-white/[0.06]"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
                                </div>
                                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="text-sm sm:text-base leading-relaxed text-[#9CA3AF]">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="relative z-10 py-12 sm:py-20">
                <div className="mx-auto w-[92%] max-w-5xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { number: "50K+", label: "Active Students" },
                            { number: "120+", label: "Courses" },
                            { number: "95%", label: "Completion Rate" },
                            { number: "24/7", label: "Learning Support" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04]
              p-5 sm:p-8 text-center backdrop-blur-2xl"
                            >
                                <p className="text-3xl sm:text-4xl font-bold text-white">{item.number}</p>
                                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#9CA3AF]">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="relative z-10 py-16 sm:py-28 px-4 sm:px-6">
                <div
                    className="mx-auto flex w-full max-w-4xl flex-col items-center rounded-3xl sm:rounded-[40px]
        border border-white/10 bg-white/[0.04] px-6 sm:px-12 py-14 sm:py-20 text-center backdrop-blur-2xl"
                >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                        Start Today
                    </p>
                    <h2 className="max-w-2xl text-3xl sm:text-5xl font-bold leading-tight text-white">
                        Start Building Your Future Today
                    </h2>
                    <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#9CA3AF]">
                        Join thousands of learners building real-world coding skills with LearnSpace.
                    </p>
                    <div className="mt-8">
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className="flex items-center gap-2">
                                <p>Get Started</p>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    )
};

export default Home;
