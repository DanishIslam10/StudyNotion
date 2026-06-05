import React, { useEffect } from "react"
import { useGetEnrolledCourses } from "../../../../services/operations/operations";
import { NavLink } from "react-router-dom";
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
    <div className="min-h-screen bg-[#000814] text-white">
      {enrolledCoursesLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">

          {/* HEADER */}
          <div className="flex flex-col gap-3">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <NavLink to="/" className="transition-colors duration-200 hover:text-slate-400">Home</NavLink>
              <span>/</span>
              <NavLink to="/profile/enrolled-courses" className="transition-colors duration-200 hover:text-slate-400">
                Enrolled Courses
              </NavLink>
            </div>

            {/* Badge */}
            <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <p className="text-xs font-medium text-indigo-300">My Learning</p>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
              Enrolled Courses
            </h1>
            <p className="text-sm text-slate-500">
              Track your progress across all enrolled courses
            </p>
          </div>

          {/* TABLE CARD */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            {enrolledCourses && enrolledCourses?.length !== 0 ? (
              <>
                {/* TABLE HEADER */}
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#111c35] px-5 py-3.5">
                  <p className="w-[50%] text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Course Name
                  </p>
                  <p className="hidden sm:block w-[25%] text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Duration
                  </p>
                  <p className="hidden sm:block w-[25%] text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Progress
                  </p>
                </div>

                {/* ROWS */}
                <div className="flex flex-col divide-y divide-white/[0.04]">
                  {enrolledCourses.map((course) => (
                    <EnrolledCourseCard key={course._id} course={course} />
                  ))}
                </div>
              </>
            ) : (

              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                  <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">No courses yet</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    You haven't enrolled in any courses yet.
                  </p>
                </div>
                <NavLink to="/catalog">
                  <button className="rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
                px-6 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300
                hover:opacity-90 hover:scale-[1.02]">
                    Browse Courses
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
};

export default EnrolledCourses; 
