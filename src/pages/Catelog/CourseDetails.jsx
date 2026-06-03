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
        <div className="min-h-screen bg-gradient-to-b from-[#0B1120] via-[#111827] to-[#0F172A] text-white">
            {
                detailLoading ? (
                    <div className="flex w-full h-screen justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">

                            {/* LEFT SECTION */}
                            <div className="w-full lg:w-[68%] flex flex-col gap-8">

                                {/* HERO CARD */}
                                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

                                    {/* Gradient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10"></div>

                                    <div className="relative p-5 sm:p-8 flex flex-col md:flex-row gap-6">

                                        {/* Thumbnail */}
                                        <div className="md:w-[280px] shrink-0">
                                            <img
                                                className="w-full h-[180px] md:h-full object-cover rounded-2xl shadow-lg"
                                                src={courseDetails?.thumbnail || "default-image.jpg"}
                                                alt="Course Thumbnail"
                                            />
                                        </div>

                                        {/* Course Info */}
                                        <div className="flex flex-col justify-between flex-1 gap-6">

                                            <div className="space-y-4">

                                                {/* Badge */}
                                                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-4 py-1">
                                                    <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                                                    <p className="text-xs font-medium text-indigo-300">
                                                        Premium Course
                                                    </p>
                                                </div>

                                                {/* Title */}
                                                <h1 className="text-2xl sm:text-4xl font-bold leading-tight text-white">
                                                    {courseDetails?.courseName}
                                                </h1>

                                                {/* Description */}
                                                <div>
                                                    <p className="hidden sm:block text-[#B6BAC5] text-base leading-relaxed">
                                                        {courseDetails?.courseDescription}
                                                    </p>

                                                    <p className="sm:hidden text-sm text-[#B6BAC5] leading-relaxed">
                                                        {
                                                            readMore
                                                                ? courseDetails?.courseDescription
                                                                : shortDesc
                                                        }

                                                        <span
                                                            onClick={() => setReadMore((prev) => !prev)}
                                                            className="ml-2 text-indigo-400 font-medium cursor-pointer"
                                                        >
                                                            {readMore ? "Read Less" : "Read More"}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Instructor + Meta */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t border-white/10">

                                                {/* Instructor */}
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={courseDetails?.instructor?.image}
                                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/40"
                                                        alt="Instructor"
                                                    />

                                                    <div>
                                                        <p className="text-sm text-[#9CA3AF]">
                                                            Instructor
                                                        </p>

                                                        <p className="font-semibold text-white">
                                                            {courseDetails?.instructor?.firstName}{" "}
                                                            {courseDetails?.instructor?.lastName}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Language */}
                                                <div className="flex items-center gap-2 text-[#D1D5DB]">
                                                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                                    <p className="text-sm font-medium">
                                                        English
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* WHAT YOU'LL LEARN */}
                                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8 shadow-xl">

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="h-10 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500"></div>

                                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                            What you'll learn
                                        </h2>
                                    </div>

                                    <p className="text-[#C5C7D4] leading-relaxed text-base">
                                        {courseDetails?.whatWillYouLearn ||
                                            "Description of what you'll learn in this course."}
                                    </p>
                                </div>

                                {/* COURSE CONTENT */}
                                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8 shadow-xl">

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                                Course Content
                                            </h2>

                                            <p className="text-[#9CA3AF] mt-2 text-sm sm:text-base">
                                                {courseDetails?.courseContent?.length} Sections •{" "}
                                                {lectureCount} Lectures •{" "}
                                                {courseDuration} Total Length
                                            </p>
                                        </div>

                                        {/* Stats Pill */}
                                        <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-4 py-2 w-fit">
                                            <div className="h-3 w-3 rounded-full bg-indigo-400 animate-pulse"></div>

                                            <p className="text-sm text-indigo-300 font-medium">
                                                Structured Learning Path
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {courseDetails?.courseContent.map((section, index) => (
                                            <div
                                                key={index}
                                                className="rounded-2xl overflow-hidden border border-white/5 bg-[#1E293B]/70 hover:bg-[#243244]/80 transition-all duration-300"
                                            >
                                                <CourseContent section={section} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SECTION */}
                            <div className="w-full lg:w-[32%]">

                                <div className="sticky top-6">
                                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">

                                        {/* Decorative Top Gradient */}
                                        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>

                                        <div className="p-5 sm:p-6">
                                            {
                                                alReadyEnrolled ? (
                                                    <AlReadyEnrolled
                                                        courseDetails={courseDetails}
                                                    />
                                                ) : (
                                                    <ProcedeToBuy
                                                        courseDetails={courseDetails}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>
                )
            }
        </div>
    );
};

export default CourseDetails;
