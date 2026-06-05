import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FiClock } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi";
import { useGetCourseDetails } from "../../services/operations/operations";

const CourseCard = ({ course }) => {

    const navigate = useNavigate();

    const getCourseDetails = useGetCourseDetails();

    const { enrolledCourses } = useSelector(
        (state) => state.enrolledCourses
    );

    const [readMore, setReadMore] = useState(false);

    const isEnrolled = enrolledCourses?.some(
        (item) => item?._id === course?._id
    );

    const description = readMore
        ? course?.courseDescription
        : `${course?.courseDescription
            ?.split(" ")
            .slice(0, 14)
            .join(" ")}...`;

    async function showCourseDetailsHandler() {

        await getCourseDetails(course?._id);

        navigate("/catalog/course-details");
    }

    return (
        <div
            onClick={showCourseDetailsHandler}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1526]
    cursor-pointer flex flex-col transition-all duration-300
    hover:-translate-y-1 hover:border-indigo-500/40
    hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]"
        >

            {/* THUMBNAIL */}
            <div className="relative overflow-hidden">
                <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526] via-[#0d1526]/30 to-transparent" />

                {/* ENROLLED BADGE */}
                {isEnrolled && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full
        bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
        px-3 py-1 text-[11px] font-bold text-black shadow-lg">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Enrolled
                    </div>
                )}

                {/* TOP-RIGHT PRICE PILL — visible on hover */}
                <div className="absolute top-3 right-3 rounded-xl border border-white/10 bg-[#0d1526]/80
      px-3 py-1 text-sm font-bold text-white backdrop-blur-sm
      opacity-0 translate-y-1 transition-all duration-300
      group-hover:opacity-100 group-hover:translate-y-0">
                    ₹{course?.price}
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col justify-between p-5">
                <div className="flex flex-col gap-3">

                    {/* CATEGORY BADGE */}
                    <div className="flex w-fit items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1">
                        <div className="h-1 w-1 rounded-full bg-indigo-400" />
                        <p className="text-[10px] font-medium text-indigo-300 uppercase tracking-wider">Course</p>
                    </div>

                    {/* TITLE */}
                    <h2 className="text-base font-semibold leading-snug text-white line-clamp-2
        transition-colors duration-200 group-hover:text-transparent
        group-hover:bg-gradient-to-r group-hover:from-[#ecec07] group-hover:via-[#a6ff5e] group-hover:to-[#ffbc57]
        group-hover:bg-clip-text">
                        {course?.courseName}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-sm leading-relaxed text-slate-500">
                        {description}
                        {course?.courseDescription?.split(" ").length > 14 && (
                            <span
                                onClick={(e) => { e.stopPropagation(); setReadMore(prev => !prev); }}
                                className="ml-1 font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                            >
                                {readMore ? "Read less" : "Read more"}
                            </span>
                        )}
                    </p>

                    {/* META */}
                    <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <FiClock className="text-slate-600" />
                            <span>24 hrs</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <BsPeople className="text-slate-600" />
                            <span>1.2k students</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#a6ff5e]">
                            <HiOutlineStar />
                            <span>4.8</span>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="my-4 border-t border-white/[0.06]" />

                {/* BOTTOM ROW */}
                <div className="flex items-center justify-between">

                    {/* PRICE */}
                    <div className="flex flex-col">
                        <p className="text-xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                            ₹{course?.price}
                        </p>
                        <p className="text-[11px] text-slate-600">Lifetime access</p>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={(e) => { e.stopPropagation(); showCourseDetailsHandler(); }}
                        className="rounded-xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
          px-4 py-2 text-xs font-bold text-black shadow-lg
          transition-all duration-200 hover:scale-[1.05] hover:shadow-[0_4px_20px_rgba(166,255,94,0.25)]
          active:scale-[0.98]"
                    >
                        View Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;