import React from "react"
import { HiUsers } from "react-icons/hi2";

const ExploreMoreCard = ({ course, currentCard,setCurrentCard }) => {
    return (
        <div className={`sm:w-[40%] lg:w-[30%] flex flex-col justify-between gap-14 text-black p-2 m-4 cursor-pointer
            ${currentCard === course.heading ? "bg-white shadow-[10px_10px_0px_-2px_rgba(255,214,10,1)] " : "bg-[rgba(22,29,41,1)]"}`}
            onClick={() => setCurrentCard(course.heading)}
            >
            <div className="flex flex-col gap-2">
                <p className={`text-xl font-[600] ${currentCard === course.heading ? "text-[rgba(22,29,41,1)]" : "text-white"} `}> {course.heading} </p>
                <p className={`text-sm font-[400] text-[rgba(88,93,105,1)] `}> {course.description} </p>
            </div>
            <div className={`flex justify-between gap-4 px-2 
                ${currentCard === course.heading ? "text-[rgba(10,90,114,1)] border-t-2 border-dotted border-[rgba(197,199,212,1)] " : "text-[rgba(131,136,148,1)] border-t-2 border-dotted border-[rgba(66,72,84,1)] "} pt-2`} >
                <div className="flex gap-2 justify-center items-center">
                    <HiUsers />
                    <p> {course.level} </p>
                </div>
                <div className="flex gap-2">
                    <p> {course.lessonNumber} </p>
                    <p> Lessons </p>
                </div>
            </div>
        </div>
    )
};

export default ExploreMoreCard;
