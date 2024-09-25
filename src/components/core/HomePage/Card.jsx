import React from "react"

const Card = ({ logo, heading, description }) => {
    return (
        <div className="flex flex-col relative">
            <div className="flex gap-5 items-center py-10">
                <div className="bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full">
                    <img className="" src={logo}></img>
                </div>
                <div className="flex flex-col">
                    <p className="text-[#161D29] text-xl font-[600] ">{heading}</p>
                    <p className="text-[#2C333F] text-sm font-[400] ">{description}</p>
                </div>
            </div>
        </div>
    )
};

export default Card;
