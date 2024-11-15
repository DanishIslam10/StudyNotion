import React from "react"
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm";
import PublishCourse from "./PublishCourse"
import { FaCheck } from "react-icons/fa6";

const RenderSteps = (props) => {

    const { step } = useSelector((state) => state.newCourse);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];

    return (
        <div className="flex flex-col justify-between items-center md:m-4 gap-6">
            <div className="flex justify-between sm:w-[90%] w-full items-center gap-2 ">
                {steps.map((stepItem, index) => (

                    <div className="text-white flex flex-col gap-1 items-center w-[40%] ">
                        <p className={`rounded-full
                         ${stepItem.id === step ?
                          "bg-[#251400] text-xl px-4 py-2 text-[#FFD60A] border-[1px] border-[#FFD60A]":
                           "bg-[#2C333F] text-sm px-2 py-1 text-[#838894] border-[1px] border-[#838894] "}
                           ${stepItem.id < step && "bg-[#FFD60A] text-black text-sm py-2 border-none " } `}>
                            {stepItem.id < step ? (<FaCheck/>) : (stepItem.id) }
                        </p>
                        <p className="text-xs text-center min-w-max "> {stepItem.title} </p>
                    </div>
                ))}
            </div>
            <div className="w-full">
                {step === 1 && <CourseInformationForm />}
                {step === 2 && <CourseBuilderForm />}
                {step === 3 && <PublishCourse />}
            </div>
        </div>
    )
};

export default RenderSteps;
