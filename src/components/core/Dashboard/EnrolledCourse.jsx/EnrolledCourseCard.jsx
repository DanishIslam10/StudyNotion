import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import moment from "moment";
import { useDispatch } from "react-redux";

const EnrolledCourseCard = ({ course }) => {

    const shortDescMd = `${course?.courseDescription?.split(" ").slice(0, 3).join(" ")}...`
    const shortDescSm = `${course?.courseDescription?.split(" ").slice(0, 7).join(" ")}...`
    const [readMore, setReadMore] = useState(false)
    const [courseDuration, setCourseDuration] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
        localStorage.setItem("enrolledCourse",JSON.stringify(course))
        navigate("/profile/enrolled-courses/view-course")
    }

    return (
        <div>
            <div className="flex gap-2 p-2">
                <div className="flex sm:w-[50%] ">
                    <div className="flex items-start">
                        <img className="max-w-28 object-contain mr-2 " src={course?.thumbnail} />
                    </div>
                    <div className="flex flex-col gap-1 " >
                        <p
                            onClick={viewEnrolledCourseHandler}
                            className="md:text-base sm:text-xs text-base font-[500] text-[#F1F2FF] cursor-pointer hover:underline ">
                            {course?.courseName}
                        </p>
                        {
                            readMore ? (
                                <p className="md:text-base sm:text-xs text-sm font-[400] text-[#838894] ">
                                    {course?.courseDescription}
                                    <span
                                        onClick={() => setReadMore((prev) => !prev)}
                                        className="md:text-sm text-xs text-[#797878] cursor-pointer hover:underline hover:text-[#e6e6e6] "
                                    >
                                        {
                                            readMore ? ("Read Less") : ("Read More")
                                        }
                                    </span>
                                </p>
                            ) : (
                                <>
                                    <p className="sm:block hidden md:text-base sm:text-xs text-sm font-[400] text-[#838894] ">
                                        {shortDescMd}
                                        <span
                                            onClick={() => setReadMore((prev) => !prev)}
                                            className="md:text-sm sm:text-xs text-sm text-[#757474] cursor-pointer hover:underline hover:text-[#e6e6e6] "
                                        >
                                            {
                                                readMore ? ("Read Less") : ("Read More")
                                            }
                                        </span>
                                    </p>
                                    <p className="sm:hidden block md:text-base sm:text-xs text-sm font-[400] text-[#838894] ">
                                        {shortDescSm}
                                        <span
                                            onClick={() => setReadMore((prev) => !prev)}
                                            className="md:text-sm sm:text-xs text-xs text-[#757474] cursor-pointer hover:underline hover:text-[#e6e6e6] "
                                        >
                                            {
                                                readMore ? ("Read Less") : ("Read More")
                                            }
                                        </span>
                                    </p>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="w-[25%] sm:block hidden text-center ">
                    <p className="text-[#C5C7D4] text-base">
                        {
                            formatTime(Math.floor(courseDuration))
                        }
                    </p>
                </div>
                <div className="w-[25%] sm:block hidden text-center ">
                    <p>Progress Info</p>
                </div>
            </div>
        </div>
    )
};

export default EnrolledCourseCard;
