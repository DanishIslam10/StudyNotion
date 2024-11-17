import React from "react"

const PersonalDetailsCard = ({tag_1,info_1,tag_2,info_2,tag_3,info_3}) => {
    return (
        <div className="flex gap-4 p-2 md:flex-nowrap flex-wrap">
        <div className="w-full">
            <p className="text-sm font-[400] text-[#424854] w-max "> {tag_1} </p>
            <p className="text-sm fonr-[500] text-[#F1F2FF] w-max "> {info_1} </p>
        </div>
        <div className="w-full">
            <p className="text-sm font-[400] text-[#424854] w-max "> {tag_2} </p>
            <p className="text-sm fonr-[500] text-[#F1F2FF] w-max "> {info_2} </p>
        </div>
        <div className="w-full">
            <p className="text-sm font-[400] text-[#424854] "> {tag_3} </p>
            <p className="text-sm fonr-[500] text-[#F1F2FF] w-max "> {info_3} </p>
        </div>
        </div>
    )
};

export default PersonalDetailsCard;
