import React, { useEffect } from "react"
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4"
import SectionBlock from "../components/core/HomePage/SectionBlock";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import bghome from "../assets/Images/bghome.svg"
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import KnowYourProgress from "../assets/Images/Know_your_progress.svg"
import CompareWithOthers from "../assets/Images/Compare_with_others.svg"
import PlanYourLessons from "../assets/Images/Plan_your_lessons.svg"
import Instructor from "../assets/Images/Instructor.png"
import Footer from "../components/core/HomePage/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import { useSelector } from "react-redux";


const Home = (props) => {

    

    return (
        <div className="flex flex-col items-center justify-center text-white">
            <div className="flex flex-col items-center lg:w-[50vw] w-[80vw] gap-9 mt-10">
                <Link to={"/signup"}>
                    <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center gap-2 bg-[#161D29] shadow-md shadow-[#FFFFFF2E] py-2 px-6 
                        rounded-full text-[#999DAA] cursor-pointer transition-all duration-200 hover:scale-105
                        w-fit hover:bg-[black]">
                            <p className="font-[500]">Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div>
                    <p className="text-3xl font-[600] text-center">Empower Your Future with <HighlightedText text={"Coding Skills"} color={"#1FA2FF"} /> </p>
                </div>
                <div>
                    <p className="text-[16px] font-[500] text-[#838894] text-center">With our online coding courses, you can learn at your own pace, from anywhere in
                        the world, and get access to a wealth of resources, including hands-on projects,
                        quizzes, and personalized feedback from instructors. </p>
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <CTAButton active={true} children={"Learn More"} />
                    <CTAButton active={false} children={"Book a Demo"} />
                </div>
                <div>
                    <div className="w-[75vw] shadow-[-100px_-100px_150px_-140px_rgb(0,120,153)] my-6">
                        <video muted loop autoPlay className="shadow-[22px_22px_0_-10px_rgb(255,255,255)]">
                            <source src={Banner} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div> 

            {/* Section 1 */}
            <SectionBlock
                direction={"flex-row"}
                heading={<>Unlock your {<HighlightedText text={"coding potential"} color={"#1FA2FF"} />} with our online courses.</>}
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctaButton1={"Try it Yourself"}
                ctaButton2={"Learn More"}
                codeBlock={
                    `<!Doctype html>
<html>
<head>
<link rel="stylesheet" href="styles.css">
<title>Your Title</title>
</head>
<body>
<h1>Heading</h1>
</body>
</html>`}
                codeColor="rgb(255,255,255)"
                backgroundGradient="rgba(255,255,0,0.5)"
            />
            <SectionBlock
                direction={"flex-row-reverse"}
                heading={<>start {<HighlightedText text={"coding in seconds"} color={"#1FA2FF"} />} </>}
                subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctaButton1={"Continue Lesson"}
                ctaButton2={"Learn More"}
                codeBlock={
                    `<!Doctype html>
<html>
<head>
<link rel="stylesheet" href="styles.css">
<title>Your Title</title>
</head>
<body>
<h1>Heading</h1>
</body>
</html>`}
                codeColor="rgb(255,255,255)"
                backgroundGradient="rgb(4,119,174,0.5)"
            />
            <ExploreMore/>
            {/* Section 2 */}
            <div className="w-full h-60 bg-white flex justify-center items-center"
                style={{
                    backgroundImage: `url(${bghome})`, // Replace with the path to your image
                    backgroundSize: '20%', // Adjust size as needed
                    backgroundPosition: 'center', // Center the image
                    backgroundRepeat: "repeat"
                }}>
                <div className="flex gap-6">
                    <CTAButton active={true} linkTo={"/signup"}>
                        <div className="flex justify-center items-center gap-2">
                            <p>Explore Full Catelog</p>
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={false} children={"Learn More"} linkTo={"/signup"} />
                </div>
            </div>

            <div className="bg-[#f3f1f1] w-full flex flex-col justify-center items-center gap-12 py-12">
                <div className="flex flex-wrap sm:flex-nowrap lg:w-[90%] px-10 gap-10">
                    <div>
                        <p className="text-black text-4xl font-[600]">
                            Get the skills you need for a <HighlightedText text={"job that is in demand"} color={"#20BDFF"} />
                        </p>
                    </div>
                    <div className="flex flex-col gap-12">
                        <p className="text-[#2C333F] text-base font-[500]">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist
                            requires more than professional skills.
                        </p>
                        <div className="w-fit">
                            <CTAButton children={"Learn More"} active={true} linkTo={"/signup"} />
                        </div>
                    </div>
                </div>

                <TimeLineSection />

            </div>

            {/* Section 3 */}
            <div className="flex flex-col justify-center items-center bg-[#f3f1f1] w-full">
                <div className="flex flex-col gap-4 sm:w-[55%] w-[90%] my-10">
                    <div>
                        <p className="text-black font-[600] text-4xl text-center ">Your swiss knife for <HighlightedText text={"learning any language"} color={"rgba(32,189,255,1)"} /></p>
                    </div>
                    <div>
                        <p className="font-[500] text-center text-base text-[rgba(44,51,63,1)] ">
                            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
                            progress tracking, custom schedule and more.
                        </p>
                    </div>
                </div>
                <div className=" bg-[#f3f1f1] flex sm:flex-row flex-col sm:w-[80%] justify-center items-center">
                    <div className="w-[80%]">
                        <img className="" src={KnowYourProgress} ></img>
                    </div>
                    <div className="w-[80%]">
                        <img className="" src={CompareWithOthers} ></img>
                    </div>
                    <div className="w-[80%]">
                        <img className="" src={PlanYourLessons} ></img>
                    </div>
                </div>
                <div className="my-10">
                    <CTAButton active={true} children={"learn More"} linkTo={"/signup"} />
                </div>
            </div>

            {/* Section 3 */}
            <div className="flex w-[90%] sm:flex-nowrap flex-wrap gap-6 sm:gap-0 py-12 justify-evenly items-center">
                <div className="w-[80%] sm:w-fit shadow-[-14px_-14px_0px_0px_rgba(255,255,255,1)] ">
                    <img src={Instructor} ></img>
                </div>
                <div className="sm:w-[40%] w-[80%] flex flex-col gap-4 sm:px-10">
                    <div>
                        <p className="text-4xl font-[600] ">Become an <HighlightedText text={"instructor"} color={"rgba(18,216,250,1)"} /> </p>
                    </div>
                    <div>
                        <p className="text-[rgba(131,136,148,1)] ">
                            Instructors from around the world teach millions of students on StudyNotion. We provide
                            the tools and skills to teach what you love.
                        </p>
                    </div>
                    <div className="w-fit mt-10">
                        <CTAButton active={"true"} linkTo={"signup"}>
                            <div className="flex justify-center items-center gap-2">
                                <p>Start Teaching Today</p>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
            {/* Footer */} 
                <Footer />
        </div>
    )
};

export default Home;
