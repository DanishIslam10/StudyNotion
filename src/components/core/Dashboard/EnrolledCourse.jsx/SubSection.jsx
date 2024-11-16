import React from "react"
import { IoIosTv } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SubSection = ({ subSection, getViewingLectureDataForLg, getViewingLectureDataForSm }) => {

    const dispatch = useDispatch()

    function playLectureHandlerForLg() {
        //    dispatch(setViewinglectureData(subSection))
        getViewingLectureDataForLg(subSection)
    }
    function playLectureHandlerForSm() {
        //    dispatch(setViewinglectureData(subSection))
        getViewingLectureDataForSm(subSection)
    }

    return (
        <div>
            <div className="flex justify-between items-center py-2 px-4">
                <div className="flex gap-1 items-center text-sm">
                    <IoIosTv className="text-[#C5C7D4] text-sm" />
                    <p className="text-[#47A5C5]"> {subSection.title} </p>
                </div>

                <FaPlay
                    onClick={playLectureHandlerForLg}
                    className="text-[#47A5C5] hidden sm:block ml-2 text-sm cursor-pointer hover:scale-110 hover:text-[#FFD60A] " />

                <FaPlay
                    onClick={playLectureHandlerForSm}
                    className="sm:hidden text-[#dfe1e1] ml-2 text-sm cursor-pointer hover:scale-110 hover:text-[#FFD60A] " />
            </div>
        </div>
    )
};

export default SubSection;
