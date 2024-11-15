import React from "react"
import { IoIosTv } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SubSection = ({ subSection,getViewingLectureData }) => {

    const dispatch = useDispatch()

    function playLectureHandler() {
    //    dispatch(setViewinglectureData(subSection))
          getViewingLectureData(subSection)
    }

    return (
        <div>
            <div className="flex justify-between items-center py-2 px-4">
                <div className="flex gap-1 items-center text-sm">
                    <IoIosTv className="text-[#C5C7D4] text-sm" />
                    <p className="text-[#47A5C5]"> {subSection.title} </p>
                </div>
                <FaPlay 
                onClick={playLectureHandler}
                className="text-[#47A5C5] ml-2 text-sm cursor-pointer hover:scale-110 hover:text-[#FFD60A] " />
            </div>
        </div>
    )
};

export default SubSection;
