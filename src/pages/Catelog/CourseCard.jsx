import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCourseDetails, setAlreadyEnrolled } from "../../slices/catalogSlice";
import { useGetCourseDetails, useGetEnrolledCourses } from "../../services/operations/operations"

const CourseCard = ({ course }) => {

    const navigate = useNavigate()
    const getCourseDetails = useGetCourseDetails()
    const { enrolledCourses } = useSelector((state) => state.enrolledCourses)
    console.log("enrolled courses: ", enrolledCourses)
    const [readMore, setReadMore] = useState(false)
    const description = readMore ? (course?.courseDescription) : `${course?.courseDescription?.split(" ").slice(0, 9).join(" ")}...`;

    function showCourseDetailsHandler() {
        getCourseDetails(course._id)
        navigate("/catalog/course-details")
    }

    return (
        <div onClick={showCourseDetailsHandler}
            className="flex flex-col justify-between rounded-md cursor-pointer transition-all duration-200 p-2 
        hover:shadow-[0px_0px_10px_1px_rgba(116,116,116,1)] hover:scale-105 ">
            <div className="flex flex-col gap-2">
                <img className="rounded-md" src={course?.thumbnail} />
                <div className="flex flex-col gap-2">
                    <p className="text-[#F1F2FF] text-lg "> {course?.courseName} </p>
                    <p className="text-[#b6b6b7] " >
                        {description}
                        <span
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents parent div's onClick from firing
                                setReadMore((prev) => !prev);
                            }}
                            className="text-[#686d71] font-thin text-sm cursor-pointer
                         hover:text-[#abacad] hover:underline mx-1"
                        >
                            {readMore ? ("Read Less") : ("Read More")}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <p className="md:text-xl text-lg text-[#F1F2FF] " >Rs. {course?.price}</p>
            </div>
        </div>
    )
};

export default CourseCard;
