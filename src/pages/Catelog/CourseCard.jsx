import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FiClock } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi";
import { useGetCourseDetails } from "../../services/operations/operations";

const CourseCard = ({ course }) => {

    const navigate = useNavigate();

    const getCourseDetails = useGetCourseDetails();

    const { enrolledCourses } = useSelector(
        (state) => state.enrolledCourses
    );

    const [readMore, setReadMore] = useState(false);

    const isEnrolled = enrolledCourses?.some(
        (item) => item?._id === course?._id
    );

    const description = readMore
        ? course?.courseDescription
        : `${course?.courseDescription
            ?.split(" ")
            .slice(0, 14)
            .join(" ")}...`;

    async function showCourseDetailsHandler() {

        await getCourseDetails(course?._id);

        navigate("/catalog/course-details");
    }

    return (
        <div
            onClick={showCourseDetailsHandler}
            className="group bg-[#161D29] border border-[#2C333F] rounded-xl overflow-hidden cursor-pointer
            transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD60A]
            hover:shadow-[0px_0px_25px_rgba(255,214,10,0.08)] flex flex-col justify-between"
        >

            {/* Thumbnail */}
            <div className="relative overflow-hidden">

                <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="w-full h-[210px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/90 via-transparent to-transparent"></div>

                {/* Enrolled Badge */}
                {
                    isEnrolled && (
                        <div className="absolute top-3 left-3 bg-[#FFD60A] text-[#000814]
                        text-xs font-semibold px-3 py-1 rounded-full">
                            Enrolled
                        </div>
                    )
                }

            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between flex-1">

                <div className="flex flex-col gap-3">

                    {/* Title */}
                    <h2 className="text-[#F1F2FF] text-lg font-semibold line-clamp-2
                    group-hover:text-[#FFD60A] transition-colors duration-200">

                        {course?.courseName}

                    </h2>

                    {/* Description */}
                    <p className="text-[#B8B8D1] text-sm leading-6">

                        {description}

                        {
                            course?.courseDescription?.split(" ").length > 14 && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReadMore((prev) => !prev);
                                    }}
                                    className="text-[#6E7CF3] ml-1 hover:underline"
                                >
                                    {readMore ? "Read Less" : "Read More"}
                                </span>
                            )
                        }

                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-[#838894] text-xs pt-1">

                        <div className="flex items-center gap-1">
                            <FiClock />
                            <span>24 Hrs</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <BsPeople />
                            <span>1.2k Students</span>
                        </div>

                        <div className="flex items-center gap-1 text-[#FFD60A]">
                            <HiOutlineStar />
                            <span>4.8</span>
                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-6">

                    {/* Price */}
                    <div className="flex flex-col">

                        <p className="text-[#FFD60A] text-2xl font-bold">
                            ₹{course?.price}
                        </p>

                        <p className="text-[#838894] text-xs">
                            Lifetime Access
                        </p>

                    </div>

                    {/* CTA */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            showCourseDetailsHandler();
                        }}
                        className="bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-[#000814] text-sm font-semibold
                        px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200"
                    >
                        View Course
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CourseCard;