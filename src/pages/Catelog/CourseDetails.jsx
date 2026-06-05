import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import Footer from "../../components/core/HomePage/Footer";
import moment from "moment";
import { setAlreadyEnrolled } from "../../slices/catalogSlice";
import ProcedeToBuy from "./ProcedeToBuy"
import AlReadyEnrolled from "./AlreadyEnrolled";
import Spinner from "../../components/common/Spinner"

const CourseDetails = () => {

    const dispatch = useDispatch();
    const { courseDetails, alReadyEnrolled, detailLoading } = useSelector((state) => state.catalog)
    const { enrolledCourses } = useSelector((state) => state.enrolledCourses)
    const { cart } = useSelector((state) => state.cart)
    const [lectureCount, setLectureCount] = useState(0)
    const [courseDuration, setCourseDuration] = useState(0)
    const [readMore, setReadMore] = useState(false)
    // console.log("already enrolled in details:", alReadyEnrolled)
    // console.log("course details: ", courseDetails)

    useEffect(() => {
        if (enrolledCourses?.find((course) => course._id === courseDetails?._id)) {
            dispatch(setAlreadyEnrolled(true))
            return
        }
        dispatch(setAlreadyEnrolled(false))
    }, [courseDetails])

    useEffect(() => {
        let subSectionCount = 0
        for (let i = 0; i < courseDetails?.courseContent?.length; i++) {
            subSectionCount += courseDetails.courseContent[i].subSection?.length
        }
        setLectureCount(subSectionCount)

        let courseDuration = 0
        for (let i = 0; i < courseDetails?.courseContent?.length; i++) {
            courseDuration += courseDetails.courseContent[i].totalDuration
        }
        setCourseDuration(formatTime(Math.floor(courseDuration)))

    }, [cart, courseDetails?._id, courseDetails]);

    const shortDesc = `${courseDetails?.courseDescription?.split(" ").slice(0, 10).join(" ")}...`

    const formatTime = (seconds) => {
        // Using moment to create a duration and format it to mm:ss
        return moment.utc(seconds * 1000).format("HH:mm:ss"); // Convert seconds to milliseconds
    }

    return (
        <div className="min-h-screen bg-[#000814] text-white">
            {detailLoading ? (
                <div className="flex h-screen w-full items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">

                        {/* ── LEFT SECTION ── */}
                        <div className="w-full lg:w-[68%] flex flex-col gap-6">

                            {/* HERO CARD */}
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

                                {/* Top accent */}
                                <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                                <div className="p-5 sm:p-8 flex flex-col md:flex-row gap-6">

                                    {/* THUMBNAIL */}
                                    <div className="md:w-[260px] shrink-0">
                                        <img
                                            src={courseDetails?.thumbnail || "default-image.jpg"}
                                            alt="Course Thumbnail"
                                            className="w-full h-[180px] md:h-full object-cover rounded-2xl border border-white/10"
                                        />
                                    </div>

                                    {/* COURSE INFO */}
                                    <div className="flex flex-col justify-between flex-1 gap-5">
                                        <div className="flex flex-col gap-4">

                                            {/* BADGE */}
                                            <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                                <p className="text-xs font-medium text-indigo-300">Premium Course</p>
                                            </div>

                                            {/* TITLE */}
                                            <h1 className="text-2xl sm:text-4xl font-bold leading-tight bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                                {courseDetails?.courseName}
                                            </h1>

                                            {/* DESCRIPTION */}
                                            <p className="hidden sm:block text-sm sm:text-base text-slate-400 leading-relaxed">
                                                {courseDetails?.courseDescription}
                                            </p>
                                            <p className="sm:hidden text-sm text-slate-400 leading-relaxed">
                                                {readMore ? courseDetails?.courseDescription : shortDesc}
                                                <span
                                                    onClick={() => setReadMore(prev => !prev)}
                                                    className="ml-2 font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200"
                                                >
                                                    {readMore ? "Read less" : "Read more"}
                                                </span>
                                            </p>
                                        </div>

                                        {/* INSTRUCTOR + LANGUAGE */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.08] pt-4">

                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={courseDetails?.instructor?.image}
                                                    alt="Instructor"
                                                    className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-500/40"
                                                />
                                                <div>
                                                    <p className="text-xs text-slate-500">Instructor</p>
                                                    <p className="text-sm font-semibold text-white">
                                                        {courseDetails?.instructor?.firstName}{" "}
                                                        {courseDetails?.instructor?.lastName}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111c35] px-3 py-1.5 w-fit">
                                                <div className="h-1.5 w-1.5 rounded-full bg-[#a6ff5e]" />
                                                <p className="text-xs font-medium text-slate-300">English</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WHAT YOU'LL LEARN */}
                            <div className="rounded-3xl border border-white/10 bg-[#0d1526] p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

                                <div className="flex items-center gap-3 mb-5">
                                    <div className="h-10 w-1 rounded-full bg-gradient-to-b from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                                        What you'll learn
                                    </h2>
                                </div>

                                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                                    {courseDetails?.whatWillYouLearn || "Description of what you'll learn in this course."}
                                </p>
                            </div>

                            {/* COURSE CONTENT */}
                            <div className="rounded-3xl border border-white/10 bg-[#0d1526] p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />
                                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                                                Course Content
                                            </h2>
                                        </div>
                                        <p className="text-slate-500 text-sm ml-4">
                                            {courseDetails?.courseContent?.length} Sections •{" "}
                                            {lectureCount} Lectures •{" "}
                                            {courseDuration} Total Length
                                        </p>
                                    </div>

                                    {/* BADGE */}
                                    <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5 shrink-0">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                        <p className="text-xs font-medium text-indigo-300">Structured Learning Path</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {courseDetails?.courseContent.map((section, index) => (
                                        <div
                                            key={index}
                                            className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111c35]
                    hover:border-indigo-500/20 hover:bg-[#152040] transition-all duration-300"
                                        >
                                            <CourseContent section={section} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT SECTION ── */}
                        <div className="w-full lg:w-[32%]">
                            <div className="sticky top-6">
                               
                                    {/* Top accent */}
                        
                                    <div>
                                        {alReadyEnrolled ? (
                                            <AlReadyEnrolled courseDetails={courseDetails} />
                                        ) : (
                                            <ProcedeToBuy courseDetails={courseDetails} />
                                        )}
                                    </div>
                                
                            </div>
                        </div>

                    </div>

                    <Footer />
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
