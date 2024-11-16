import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import Footer from "../../components/core/HomePage/Footer";
import moment from "moment";
import { setAlreadyEnrolled, setCourseDetails } from "../../slices/catalogSlice";
import ProcedeToBuy from "./ProcedeToBuy"
import AlReadyEnrolled from "./AlreadyEnrolled";

const CourseDetails = () => {

    const dispatch = useDispatch();
    const { courseDetails, alReadyEnrolled } = useSelector((state) => state.catalog)
    const { cart } = useSelector((state) => state.cart)
    const [lectureCount, setLectureCount] = useState(0)
    const [courseDuration, setCourseDuration] = useState(0)
    const [readMore, setReadMore] = useState(false)
    // console.log("already enrolled in details:", alReadyEnrolled)
    // console.log("course details: ", courseDetails)

    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses"))

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
        <div>
            <div className="flex justify-center sm:flex-row flex-col gap-4 py-5 px-3 sm:px-5 md:px-6 lg:px-8">
                <div className="sm:w-[65%] flex flex-col gap-5">
                    <div className="flex gap-2 bg-[#161D29] h-fit sm:p-5 p-3 rounded-md">
                        <img className="sm:hidden w-[40%] rounded-md" src={courseDetails?.thumbnail || "default-image.jpg"} alt="Course Thumbnail" />
                        <div className="flex flex-col justify-between gap-1 md:w-[80%] sm:pt-2 sm:p-0">
                            <div className="flex flex-col sm:gap-2 gap-1">
                                <p className="sm:text-3xl text-lg font-[500] text-[#F1F2FF]">
                                    {courseDetails?.courseName}
                                </p>
                                <p className="sm:block hidden text-sm font-[400] text-[#999DAA]">
                                    {courseDetails?.courseDescription}
                                </p>
                                <p className="sm:hidden block  text-sm font-[400] text-[#999DAA]">
                                    {
                                        readMore ? (
                                            courseDetails?.courseDescription
                                        ) : (
                                            shortDesc
                                        )
                                    } <span onClick={() => setReadMore((prev) => !prev)} className="text-[#9c9cfb] text-xs" >
                                        {
                                            readMore ? ("Read Less") : ("Read More")
                                        }
                                    </span>
                                </p>
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <p className="font-[400] sm:text-base text-xs text-[#DBDDEA]">
                                        Created By {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}
                                    </p>
                                    <img src={courseDetails?.instructor?.image} className="sm:w-10 sm:h-10 w-5 h-5 object-cover object-top rounded-full" alt="Instructor" />
                                </div>
                                <div className="flex gap-2 items-center text-sm sm:text-base text-[#DBDDEA]">
                                    {/* <FaGlobe /> */}
                                    <p>English</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-[1px] border-[#4a4a4a] p-5 gap-2 rounded-md">
                        <p className="text-3xl text-[#F1F2FF] font-[500]">What you'll learn</p>
                        <p className="text-sm text-[#C5C7D4] font-[500]">{courseDetails?.whatWillYouLearn || "Description of what you'll learn in this course."}</p>
                    </div>
                    <div>
                        <p className="text-3xl text-[#F1F2FF] font-[500] my-2">Course content</p>
                        <p className="text-sm font-[400] text-[#C5C7D4] my-2 ">
                            {courseDetails?.courseContent?.length} Sections • {lectureCount} Lectures • {courseDuration} Total Length
                        </p>
                        {courseDetails?.courseContent.map((section, index) => (
                            <CourseContent key={index} section={section} />
                        ))}
                    </div>
                </div>
                {
                    <div className="sm:w-[35%] flex flex-col gap-2 bg-[#2C333F] rounded-md h-fit">
                        {
                            alReadyEnrolled ? (
                                <AlReadyEnrolled courseDetails={courseDetails} />
                            ) : (
                                <ProcedeToBuy courseDetails={courseDetails} />
                            )
                        }
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
};

export default CourseDetails;
