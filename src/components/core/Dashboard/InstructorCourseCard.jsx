import React, { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useDeleteCourse } from "../../../services/operations/operations";

const InstructorCourseCard = ({ course }) => {

    const [courseData, setCourseData] = useState(null)

    useEffect(() => {
        setCourseData(course)
    }, [])

    const deleteCourse = useDeleteCourse()

    function delteCourseHandler() {
        deleteCourse(course._id)
        setCourseData(null)
    }

    return (
        <div>
            { courseData &&
                <div className="flex sm:flex-row flex-col justify-center items-center gap-4 text-[white] md:mb-12 mt-4 md:mx-4">
                    <img className="aspect-square w-44 max-h-60 object-cover rounded-md " src={courseData?.thumbnail} />
                    <div className="w-full flex flex-col gap-4 justify-evenly px-5">
                        <div className="md:w-[80%] flex flex-col gap-2" >
                            <p className="text-xl font-[600] text-[#F1F2FF] ">{courseData?.courseName}</p>
                            <p className="text-sm font-[400] text-[#AFB2BF] ">{courseData?.courseDescription}</p>
                            <p className="text-xs font-[500] text-[#DBDDEA] ">Created: April 27, 2023 | 05:15 PM</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="w-fit flex items-center py-2 px-4 bg-[#2C333F] 
                             rounded-full gap-2 text-[#E7C009] text-xs ">
                                <TiTick className="bg-[#FFD60A] text-[black] rounded-full " />
                                {courseData?.status}
                            </p>
                            <div className="flex gap-4 text-[#7e7e7e] text-lg ">
                                <button className="flex items-center bg-[#FFD60A] p-2 rounded-full text-[#4b4b47] 
                                                   opacity-80 hover:opacity-100 ">
                                    <FaRegEdit />
                                </button>
                                <button
                                    onClick={delteCourseHandler}
                                    className="flex items-center bg-[#691432] p-2 rounded-full text-[#EF476F] 
                                                    opacity-90 hover:opacity-100 ">
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="sm:hidden block w-full border-[1px] border-[#161D29] " ></div>
                </div>
            }
        </div>
    )
};

export default InstructorCourseCard;
