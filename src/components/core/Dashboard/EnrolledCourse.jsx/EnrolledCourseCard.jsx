import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";


const EnrolledCourseCard = ({ course }) => {

    const shortDescMd = `${course?.courseDescription?.split(" ").slice(0, 3).join(" ")}...`
    const shortDescSm = `${course?.courseDescription?.split(" ").slice(0, 7).join(" ")}...`
    const [readMore, setReadMore] = useState(false)
    const [courseDuration, setCourseDuration] = useState(0)
    const navigate = useNavigate()

    function getCourseDuration() {
        let courseDuration = 0
        for (let i = 0; i < course?.courseContent?.length; i++) {
            courseDuration += course.courseContent[i].totalDuration
        }
        setCourseDuration(courseDuration)
    }

    const formatTime = (seconds) => {
        // Using moment to create a duration and format it to mm:ss
        return moment.utc(seconds * 1000).format("HH:mm:ss"); // Convert seconds to milliseconds
    };

    useEffect(() => {
        getCourseDuration()
    }, [])

    function viewEnrolledCourseHandler() {
        localStorage.setItem("enrolledCourse", JSON.stringify(course))
        navigate("/profile/enrolled-courses/view-course")
    }

    return (
        <div className="flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:bg-[#111c35]">

            {/* COURSE NAME — 50% */}
            <div className="flex w-full sm:w-[50%] items-center gap-3 min-w-0">

                {/* Thumbnail */}
                <div className="relative shrink-0 overflow-hidden rounded-xl border border-white/10">
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-14 w-20 object-cover"
                    />
                </div>

                {/* Title + description */}
                <div className="flex flex-col gap-1 min-w-0">
                    <p
                        onClick={viewEnrolledCourseHandler}
                        className="text-sm font-semibold text-white cursor-pointer leading-snug
          transition-colors duration-200 hover:text-transparent
          hover:bg-gradient-to-r hover:from-[#ecec07] hover:via-[#a6ff5e] hover:to-[#ffbc57]
          hover:bg-clip-text line-clamp-1"
                    >
                        {course?.courseName}
                    </p>

                    <p className="hidden sm:block text-xs text-slate-500 leading-relaxed line-clamp-1">
                        {shortDescMd}
                        {course?.courseDescription?.split(" ").length > 10 && (
                            <span
                                onClick={() => setReadMore(prev => !prev)}
                                className="ml-1 font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                            >
                                {readMore ? "Read less" : "Read more"}
                            </span>
                        )}
                    </p>

                    {readMore && (
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {course?.courseDescription}
                            <span
                                onClick={() => setReadMore(prev => !prev)}
                                className="ml-1 font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                            >
                                Read less
                            </span>
                        </p>
                    )}
                </div>
            </div>

            {/* DURATION — 25% */}
            <div className="hidden sm:flex w-[25%] justify-center">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111c35] px-3 py-1.5">
                    <FaRegClock className="text-[10px] text-slate-600" />
                    <p className="text-xs font-medium text-slate-400 whitespace-nowrap">
                        {formatTime(Math.floor(courseDuration))}
                    </p>
                </div>
            </div>

            {/* PROGRESS — 25% */}
            <div className="hidden sm:flex w-[25%] flex-col items-center gap-2">
                <div className="flex w-full max-w-[140px] flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                            Progress
                        </p>
                        <p className="text-xs font-bold text-[#a6ff5e]">
                            {course?.progressPercentage ?? 0}%
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] transition-all duration-500"
                            style={{ width: `${course?.progressPercentage ?? 0}%` }}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
};

export default EnrolledCourseCard;
