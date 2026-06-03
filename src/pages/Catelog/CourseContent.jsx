import React, { useEffect, useState } from "react"
import { IoListOutline } from "react-icons/io5";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import SubSection from "./SubSection";

const CourseContent = ({ section }) => {

    const [seeSubSection, setSeeSubSection] = useState(false)
    const [subSection, setSubSection] = useState([])
    const [totalDuration, setTotalDuration] = useState(0)

    useEffect(() => {
        setTotalDuration(Math.floor(section.totalDuration))
    }, [section.totalDuration]);

    function sectionDropDownHandler(subSection) {
        setSeeSubSection((prev) => !prev)
        setSubSection(subSection)
    }

    return (
        <div className="text-white">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1A2233]/80 backdrop-blur-lg shadow-lg transition-all duration-300 hover:border-indigo-500/30 hover:shadow-indigo-500/10">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-5 bg-gradient-to-r from-[#1E293B] to-[#273449]">

                    {/* LEFT */}
                    <div className="flex items-start sm:items-center gap-3">

                        {/* Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                            <IoListOutline className="text-xl text-indigo-300" />
                        </div>

                        {/* Section Details */}
                        <div className="flex flex-col">
                            <p className="text-sm sm:text-lg font-semibold text-[#F8FAFC] leading-snug">
                                {section?.sectionName}
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-2 w-2 rounded-full bg-green-400"></div>

                                <p className="text-xs sm:text-sm text-[#94A3B8]">
                                    Structured learning section
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3 sm:gap-5">

                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-3">

                            {/* Lectures */}
                            <div className="rounded-xl bg-yellow-500/10 border border-yellow-400/20 px-3 py-2">
                                <p className="text-xs text-yellow-300 font-medium whitespace-nowrap">
                                    {section?.subSection?.length} Lectures
                                </p>
                            </div>

                            {/* Duration */}
                            <div className="rounded-xl bg-cyan-500/10 border border-cyan-400/20 px-3 py-2">
                                <p className="text-xs text-cyan-300 font-medium whitespace-nowrap">
                                    {
                                        totalDuration > 60
                                            ? `${Math.floor(totalDuration / 60)} min`
                                            : `${totalDuration} sec`
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Mobile Stats */}
                        <div className="sm:hidden flex flex-col items-end">
                            <p className="text-[11px] text-yellow-300 font-medium">
                                {section?.subSection?.length} Lectures
                            </p>

                            <p className="text-[11px] text-cyan-300">
                                {
                                    totalDuration > 60
                                        ? `${Math.floor(totalDuration / 60)} min`
                                        : `${totalDuration} sec`
                                }
                            </p>
                        </div>

                        {/* Toggle Button */}
                        <button
                            onClick={() =>
                                sectionDropDownHandler(section?.subSection)
                            }
                            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-300"
                        >
                            {
                                seeSubSection ? (
                                    <FaAngleUp className="text-lg text-[#E2E8F0] transition-transform duration-300 group-hover:scale-125" />
                                ) : (
                                    <FaAngleDown className="text-lg text-[#E2E8F0] transition-transform duration-300 group-hover:scale-125" />
                                )
                            }
                        </button>
                    </div>
                </div>

                {/* SUBSECTION */}
                <div
                    className={`transition-all duration-500 overflow-hidden ${seeSubSection
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="border-t border-white/5 bg-[#111827]/70">
                        <SubSection subSection={subSection} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CourseContent;
