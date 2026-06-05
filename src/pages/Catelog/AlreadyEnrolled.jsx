import React from "react"
import Btn from "../../components/common/Btn";
import { FaRegClock, FaMobileAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const AlReadyEnrolled = ({ courseDetails }) => {


    return (
        <div className="flex flex-col gap-5">

            {/* THUMBNAIL */}
            <div className="hidden sm:block relative overflow-hidden rounded-2xl border border-white/10">
                <img
                    src={courseDetails?.thumbnail}
                    alt="Course Thumbnail"
                    className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526]/80 to-transparent" />
            </div>

            {/* PRICE */}
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                    ₹{courseDetails?.price || "—"}
                </p>
                <p className="text-xs text-slate-500">one-time payment</p>
            </div>

            {/* ENROLLED BADGE */}
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#a6ff5e]/20 bg-[#a6ff5e]/10 px-4 py-3">
                <svg className="h-4 w-4 text-[#a6ff5e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <p className="text-sm font-semibold text-[#a6ff5e]">Already Enrolled</p>
            </div>

            {/* GIVE REVIEW BUTTON */}
            <button
                onClick={() => { }}
                className="w-full rounded-2xl border border-white/10 bg-[#111c35] py-3 text-sm font-semibold
      text-slate-300 transition-all duration-200 hover:bg-[#152040] hover:text-white"
            >
                Give Review
            </button>

            {/* MONEY BACK */}
            <div className="flex items-center justify-center gap-2">
                <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p className="text-xs text-slate-600">30-Day Money-Back Guarantee</p>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-white/[0.08]" />

            {/* COURSE INCLUDES */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    This course includes
                </p>

                <div className="flex flex-col gap-2.5">

                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                            <IoDocumentTextOutline className="text-sm text-indigo-400" />
                        </div>
                        <p className="text-sm text-slate-300">Certificate of completion</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                            <FaMobileAlt className="text-sm text-indigo-400" />
                        </div>
                        <p className="text-sm text-slate-300">Access on mobile and TV</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                            <FaRegClock className="text-sm text-indigo-400" />
                        </div>
                        <p className="text-sm text-slate-300">Full lifetime access</p>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default AlReadyEnrolled;
