import React, { useState } from "react"
import Btn from "../../components/common/Btn";
import { FaRegClock, FaMobileAlt, FaGlobe } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const AlReadyEnrolled = ({ courseDetails }) => {

    const { user } = useSelector((state) => state.profile)

    return (
        <div>
            <img className="hidden sm:block rounded-t-md" src={courseDetails?.thumbnail} alt="Course Thumbnail" />
            <div className="flex flex-col gap-4 p-4">
                <p className="sm:text-2xl md:text-3xl text-xl font-[700] text-[#F1F2FF]">Rs. {courseDetails?.price || "Price"}</p>
                <div>
                    <p
                        className="text-2xl font-[600] text-[#5cff2e] bg-[#525252] text-center uppercase p-2 rounded-md " >
                        Already Enrolled
                    </p>
                        <Btn 
                        onClickFunction={() => { }} 
                        children="Give Review" 
                        color="#161D29" 
                        textColor="#F1F2FF"
                        style={{width:"100%",marginY:"10px"}}
                        />
                    <p className="text-sm font-[400] text-[#DBDDEA] text-center">30-Day Money-Back Guarantee</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-5 pb-4">
                <p className="text-base font-[500] text-[#F1F2FF]">This course includes:</p>
                <div className="flex flex-col gap-2 md:text-sm text-xs font-[500] text-[#06D6A0]">
                    <div className="flex items-center gap-1">
                        <IoDocumentTextOutline />
                        <p>Certificate of completion</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaMobileAlt />
                        <p>Access on Mobile and TV</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaRegClock />
                        <p>Full Lifetime access</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AlReadyEnrolled;
