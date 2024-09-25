import React from "react"
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import Card from "./Card"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = (props) => {

    const timeline = [
        {
            logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            logo: Logo2,
            heading: "Responsibility",
            description: "Students will be our top priority"
        },
        {
            logo: Logo3,
            heading: "Flexibilty",
            description: "The ability to switch is an important skill"
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to a solution"
        },
    ]

    return (
        <div className="relative flex md:flex-nowrap flex-wrap w-full justify-center gap-20 items-center px-10 ">
            {/* render the cards */}
            <div className="">
                {
                    timeline.map((item, index) => {
                        return <Card key={index} logo={item.logo} heading={item.heading} description={item.description} />
                    })
                }
            </div>
            {/* render the image */}
            <div>
                <div>
                    <img className="w-full" src={TimelineImage} ></img>
                </div>
                <div className="translate-x-[12%] translate-y-[-60%] flex items-center justify-evenly sm:gap-4 gap-2 sm:py-10 p-2 bg-[rgba(1,74,50,1)] w-[80%] uppercase">
                    <div className="sm:flex flex sm:gap-10 gap-2 justify-start items-center">
                        <p className="sm:text-4xl text-xl font-[700]">10</p>
                        <p className="sm:text-sm text-xs sm:w-min text-[rgba(5,167,123,1)]">years experience</p>
                    </div>
                    <div className="w-[1px] h-8 sm:h-[8vh] bg-[rgba(5,167,123,1)] "></div>
                    <div className="sm:flex flex sm:gap-10 gap-2 justify-center items-center">
                        <p className="sm:text-4xl text-xl font-[700]">250</p>
                        <p className="sm:text-sm text-xs sm:w-min  text-[rgba(5,167,123,1)]">types of courses</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TimeLineSection;
