import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCourseDetails, setAlreadyEnrolled } from "../../slices/catalogSlice";
import { useGetCourseDetails, useGetEnrolledCourses } from "../../services/operations/operations"

const CourseCard = ({ course }) => {

    const navigate = useNavigate()
    const getCourseDetails = useGetCourseDetails()
    const { enrolledCourses } = useSelector((state) => state.enrolledCourses)
    // console.log("enrolled courses: ", enrolledCourses)
    const [readMore, setReadMore] = useState(false)
    const description = readMore ? (course?.courseDescription) : `${course?.courseDescription?.split(" ").slice(0, 9).join(" ")}...`;

    function showCourseDetailsHandler() {
        getCourseDetails(course._id)
        navigate("/catalog/course-details")
    }

    return (
        <div onClick={showCourseDetailsHandler}
            className="flex flex-col justify-between rounded-md cursor-pointer  p-2 
        hover:shadow-[0px_0px_10px_1px_rgba(100,100,100,0.5)] hover:scale-[1.01] h-fit ">
            <div className="flex flex-col gap-2">
                <img className="rounded-md" src={course?.thumbnail} />
                <div className="flex flex-col">
                    <p className="text-[#F1F2FF] text-base "> {course?.courseName} </p>
                    <p className="text-[#b6b6b7] text-sm " >
                        {description}
                        <span
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents parent div's onClick from firing
                                setReadMore((prev) => !prev);
                            }}
                            className="text-[#6f7cd7] font-thin text-xs cursor-pointer
                         hover:text-[#6e70f3] hover:underline mx-1"
                        >
                            {readMore ? ("Read Less") : ("Read More")}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <p className="md:text-xl text-lg text-[#F1F2FF] my-2 " >Rs. {course?.price}</p>
            </div>
        </div>
    )
};

export default CourseCard;
