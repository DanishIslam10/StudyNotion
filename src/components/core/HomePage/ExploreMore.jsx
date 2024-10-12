import React, { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightedText from "./HighlightedText";
import ExploreMoreCard from "./ExploreMoreCard";

const ExploreMore = (props) => {

    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag)
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((courses) => courses.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

    return (
        <div className=" w-full flex justify-center">
            <div className="w-[90%] flex flex-col justify-center items-center py-5">
                <div className=" flex flex-col gap-4">
                    <p className="text-4xl font-[600] text-center">Unlock the <HighlightedText text={"Power of Code"} color={"#1FA2FF"} /> </p>
                    <p className="text-[rgba(131,136,148,1)] text-sm font-[500] text-center ">Learn to Build Anything You Can Imagine</p>
                    <div className=" flex flex-wrap gap-4 justify-center items-center bg-[rgba(22,29,41,1)] py-2 sm:px-4 sm:rounded-full rounded-md">
                    {
                        HomePageExplore.map((item,index) => {
                            return (
                                <p key={index} className={`py-1 px-2 sm:rounded-full rounded-sm w-fit cursor-pointer
                                ${currentTab === item.tag ? "bg-[rgba(0,8,20,1)] text-white" : "text-[rgba(131,136,148,1)] "} `}
                                onClick={() => setMyCards(item.tag)} >
                                    {item.tag}
                                </p>
                                
                            )
                        })
                    }
                </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {
                      courses.map((course,index) => {
                        return <ExploreMoreCard 
                        key={index}
                        course = {course}
                        currentCard = {currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                      })
                    }
                </div>
            </div>
        </div>
    )
};

export default ExploreMore;
