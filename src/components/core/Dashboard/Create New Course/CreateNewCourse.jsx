import React from "react";
import { useSelector } from "react-redux";
import RenderSteps from "./RenderSteps";
import { IoChevronBackOutline } from "react-icons/io5";

const CreateNewCourse = (props) => {

    return (
        <div className="w-full flex md:flex-row flex-col justify-between gap-4 p-4">
            <div className="md:w-[70%] h-fit flex flex-col justify-between gap-6">
                <div className="flex items-center gap-1 text-[#838894] cursor-pointer w-fit hover:text-[#b9b9bb] ">
                    <IoChevronBackOutline />
                    <p className="text-sm font-[400]">Back to Dashboard</p>
                </div>
                <div>
                    <RenderSteps />
                </div>
            </div>
            <div className="md:w-[30%] h-fit flex flex-col gap-2 text-[#F1F2FF] bg-[#161D29] p-4 ">
                <p className="text-lg font-[600]">⚡Course Upload Tips</p>
                <div className="text-xs font-[500] ">
                    <ul className="ml-5 list-item list-disc space-y-4 text-xs">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateNewCourse;
