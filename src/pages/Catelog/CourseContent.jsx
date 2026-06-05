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
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1526]
  transition-all duration-300 hover:border-indigo-500/30">

            {/* HEADER */}
            <button
                onClick={() => sectionDropDownHandler(section?.subSection)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 text-left
      hover:bg-[#111c35] transition-all duration-200"
            >
                {/* LEFT */}
                <div className="flex items-center gap-3 min-w-0">

                    {/* Icon box */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                        <IoListOutline className="text-base text-indigo-400" />
                    </div>

                    {/* Section name + meta */}
                    <div className="flex flex-col min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-white leading-snug truncate">
                            {section?.sectionName}
                        </p>

                        <div className="flex items-center gap-3 mt-1">

                            {/* Lectures pill */}
                            <div className="flex items-center gap-1.5">
                                <div className="h-1 w-1 rounded-full bg-[#a6ff5e]" />
                                <p className="text-[11px] text-slate-500">
                                    {section?.subSection?.length} {section?.subSection?.length === 1 ? "lecture" : "lectures"}
                                </p>
                            </div>

                            {/* Duration pill */}
                            <div className="flex items-center gap-1.5">
                                <div className="h-1 w-1 rounded-full bg-indigo-400" />
                                <p className="text-[11px] text-slate-500">
                                    {totalDuration > 60
                                        ? `${Math.floor(totalDuration / 60)} min`
                                        : `${totalDuration} sec`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — pills (desktop) + chevron */}
                <div className="flex items-center gap-3 shrink-0">

                    {/* Stats pills — desktop only */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="rounded-xl border border-white/10 bg-[#111c35] px-3 py-1.5">
                            <p className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                                {section?.subSection?.length} lectures
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#111c35] px-3 py-1.5">
                            <p className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                                {totalDuration > 60
                                    ? `${Math.floor(totalDuration / 60)} min`
                                    : `${totalDuration} sec`}
                            </p>
                        </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]
        transition-colors duration-200 group-hover:border-indigo-500/30">
                        {seeSubSection
                            ? <FaAngleUp className="text-sm text-slate-400 transition-transform duration-300" />
                            : <FaAngleDown className="text-sm text-slate-400 transition-transform duration-300" />
                        }
                    </div>
                </div>
            </button>

            {/* SUBSECTIONS */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out
    ${seeSubSection ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="border-t border-white/[0.06] bg-[#060d1a]">
                    <SubSection subSection={subSection} />
                </div>
            </div>
        </div>
    )
};

export default CourseContent;
