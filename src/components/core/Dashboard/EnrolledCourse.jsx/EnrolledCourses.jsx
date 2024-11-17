import React, { useEffect } from "react"
import { useGetEnrolledCourses } from "../../../../services/operations/operations";
import { Link, NavLink } from "react-router-dom";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { useSelector } from "react-redux";
import Spinner from "../../../common/Spinner"

const EnrolledCourses = (props) => {

  const getEnrolledCourses = useGetEnrolledCourses()
  const { enrolledCourses, enrolledCoursesLoading } = useSelector((state) => state.enrolledCourses)

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div>
      {
        enrolledCoursesLoading ? (
          <div className="flex w-full h-screen justify-center items-center my-auto">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-white p-4">
            <div className="flex gap-2 text-sm font-[400] text-[#838894] ">
              <NavLink to={"/"} >
                <p>Home /</p>
              </NavLink>
              <NavLink to={"/profile/enrolled-courses"} >
                <p>Enrolled Courses</p>
              </NavLink>
            </div>
            <div>
              <p className="text-3xl font-[500] text-[#F1F2FF] ">Enrolled Courses</p>
            </div>
            <div className="flex flex-col gap-2 border-[1px] border-[#3b3b3b] rounded-md ">
              <div className="flex justify-between bg-[#2C333F] w-full p-2 rounded-md">
                <p className="w-[50%] font-sm font-[500] text-[#C5C7D4] " >Course Name</p>
                <p className="sm:block hidden w-[25%] font-sm font-[500] text-[#C5C7D4] text-center " >Duration (HH:MM:SS)</p>
                <p className="sm:block hidden w-[25%] font-sm font-[500] text-[#C5C7D4] text-center " >Progress</p>
              </div>
              {
                enrolledCourses && enrolledCourses?.length !== 0 ? (
                  enrolledCourses.map((course) => (
                    <EnrolledCourseCard course={course} />
                  ))
                ) : (
                  <p>no courses</p>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
};

export default EnrolledCourses; 
