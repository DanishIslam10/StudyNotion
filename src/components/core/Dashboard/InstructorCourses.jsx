import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetInstructorCoursesHook } from "../../../services/operations/operations";
import InstructorCourseCard from "./InstructorCourseCard";
import Btn from "../../common/Btn"
import { CiCirclePlus } from "react-icons/ci";
import Spinner from "../../common/Spinner"

const InstructorCourses = (props) => {

    const { instructorCourses, instructorCoursesLoading } = useSelector((state) => state.instructorCourses)
    console.log("Instructor courses: ", instructorCourses)

    const getInstructorCourses = useGetInstructorCoursesHook()

    useEffect(() => {
        getInstructorCourses()
    }, [])

    return (
        <div>
            {
                instructorCoursesLoading ? (
                    <div className="flex w-full h-screen justify-center items-center my-auto">
                        <Spinner />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 p-4 text-white ">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 text-sm font-[400] text-[#838894] ">
                                    <NavLink to={"/"} >
                                        <p>Home /</p>
                                    </NavLink>
                                    <NavLink to={"/profile/instructor-courses"} >
                                        <p>Enrolled Courses</p>
                                    </NavLink>
                                </div>
                                <div>
                                    <p className="text-3xl font-[500] text-[#F1F2FF] ">Enrolled Courses</p>
                                </div>
                            </div>
                            <div className="p-2">
                                <Btn textColor="black" color="#FFD60A" linkTo={"/profile/instructor-courses/create-new-course"}>
                                    <CiCirclePlus className="mr-1 text-xl " />
                                    <p>New</p>
                                </Btn>
                            </div>
                        </div>
                        <div className="flex flex-col border-[1px] border-[#161D29] rounded-md mt-6 ">
                            <div className="flex justify-between items-center p-2">
                                <div className="flex w-[70%]">
                                    <p>Courses</p>
                                </div>
                            </div>
                            <div className="w-full border-[1px] border-[#161D29] " ></div>
                            <div>
                                {
                                    instructorCourses?.map((course, index) => (
                                        <InstructorCourseCard
                                            key={index}
                                            course={course}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default InstructorCourses;
