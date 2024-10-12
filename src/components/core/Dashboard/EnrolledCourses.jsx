import React, { useEffect, useState } from "react"
import { getEnrolledCourses } from "../../../services/operations/operations";
import { Link, NavLink } from "react-router-dom";

const EnrolledCourses = (props) => {

  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    getEnrolledCourses()
      .then((response) => setEnrolledCourses(response.data.data))
  }, [])

  return (
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
      <div className="flex justify-center">
        {
          enrolledCourses && enrolledCourses.length !== 0 ? (
            <p>Here are the courses</p>
          ) : (
            <p>no courses</p>
          )
        }
      </div>
    </div>
  )
};

export default EnrolledCourses; 
