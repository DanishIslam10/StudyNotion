import React from "react"
import AboutUs1 from "../assets/Images/aboutus1.webp"
import AboutUs2 from "../assets/Images/aboutus2.webp"
import AboutUs3 from "../assets/Images/aboutus3.webp"
import HighlightedText from "../components/core/HomePage/HighlightedText";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";
import { ourFoundingStory } from "../data/aboutpage";
import { ourVision } from "../data/aboutpage";
import { statsData } from "../data/aboutpage";
import { gridSectionData } from "../data/aboutpage";
import CTAButton from "../components/core/HomePage/CTAButton";
import Footer from "../components/core/HomePage/Footer";
import ContactUsForm from "../components/common/ContactUsForm";

const About = (props) => {
    return (
        <div className="flex justify-center items-center flex-col">
            {/* section 1 */}
            <div className="flex flex-col justify-center items-center bg-[rgba(22,29,41,1)] mb-10">
                <div className="flex flex-col sm:w-[70%] w-[90%] justify-center items-center">
                    <div className="flex flex-col gap-4">
                        <p className=" text-base font-[500] text-[rgba(153,157,170,1)] sm:text-center sm:mt-20 mt-10 sm:mb-8 mb-2 " > About us </p>
                        <p className=" sm:text-4xl text-3xl font-[600] text-[rgba(241,242,255,1)] sm:text-center" > Driving Innovation
                            in Online Education for a <HighlightedText text={"Brighter Future"} color={"#1FA2FF"} /> </p>
                        <p className=" text-base font-[500] text-[rgba(131,136,148,1)] sm:text-center" > Studynotion is at the forefront of driving innovation in online education.
                            We're passionate about creating a brighter future by offering cutting-edge courses,
                            leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </div>
                    <div className="sm:w-[130%] w-full flex lg:flex-row md:flex-row sm:flex-row flex-wrap justify-center items-center gap-4 mt-12 mb-6" >
                        <img src={AboutUs1} className="sm:w-[30%] w-[40%]" ></img>
                        <img src={AboutUs2} className="sm:w-[30%] w-[40%]" ></img>
                        <img src={AboutUs3} className="sm:w-[30%] w-[40%]" ></img>
                    </div>
                </div>
            </div>
            {/* Section 2 */}
            <div className="sm:w-[85%] w-[90%] ">
                <p className="relative sm:text-4xl text-2xl font-[600] text-[rgba(175,178,191,1)] text-center ">
                    <BiSolidQuoteLeft className="inline-block text-2xl mb-6 mr-2 " />
                    We are passionate about revolutionizing the way we learn. Our innovative platform
                    <HighlightedText text={" combines technology"} color={"#1FA2FF"} /> ,
                    <HighlightedText text={" expertise"} color={"rgba(240,152,25,1)"} /> , and community to create an
                    <HighlightedText text={" unparalleled educational experience"} color={"rgba(249,212,35,1)"} />.
                    <BiSolidQuoteRight className=" mb-6 ml-1 inline-block text-2xl" />
                </p>
            </div>
            {/* page seperator horizontal line */}
            <div className="w-full h-[1px] bg-[#3e3e3e] my-14" ></div>
            {/* Section 3 */}
            <div className="lg:w-full w-[90%] flex flex-col gap-10 justify-center items-center mb-14">
                {/* our founding story */}
                <div className="sm:w-[85%] w-full flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-center sm:gap-24 gap-10 ">
                    <div className="lg:w-[60%] flex flex-col gap-4">
                        <p className="sm:text-4xl text-3xl font-[600] text-[rgba(252,176,69,1)] mb-2 " > {ourFoundingStory.heading} </p>
                        <p className="text-base font-[500] text-[rgba(131,136,148,1)] "> {ourFoundingStory.p1} </p>
                        <p className="text-base font-[500] text-[rgba(131,136,148,1)] "> {ourFoundingStory.p2} </p>
                    </div>
                    <img src={ourFoundingStory.image} className="lg:w-[50%] object-contain mx-auto " />
                </div>
                {/* our vision our mission */}
                <div className="sm:w-[85%] flex sm:flex-col md:flex-col lg:flex-row flex-col justify-center items-center sm:gap-24 gap-10">
                    {/* our vision */}
                    <div className="flex flex-col justify-center gap-2">
                        <p className="sm:text-4xl text-3xl text-[rgba(230,92,0,1)] font-[600] mb-2"> {ourVision.heading1} </p>
                        <p className="text-base font-[500] text-[rgba(131,136,148,1)] "> {ourVision.p1} </p>
                    </div>
                    {/* our mission */}
                    <div className="flex flex-col gap-2 justify-center">
                        <p className="sm:text-4xl text-3xl text-[rgba(18,216,250,1)] font-[600] mb-2"> {ourVision.heading2} </p>
                        <p className="text-base font-[500] text-[rgba(131,136,148,1)] "> {ourVision.p2} </p>
                    </div>
                </div>
            </div>
            {/* Section 4 */}
            <div className="w-full bg-[#202530] flex justify-center items-center">
                <div className="sm:w-[80%] w-[90%] text-white flex justify-between items-center gap-4 py-14">
                    {
                        statsData.map((item,index) => (
                            <div key={index} className="flex flex-col justify-center items-center w-fit">
                                <p className="sm:text-3xl text-xl font-[700] text-[rgba(241,242,255,1)] ">{item.number}</p>
                                <p className="sm:text-base text-sm font-[600] text-[rgba(88,93,105,1)] sm:w-fit">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Section 5 (grid) */}
            <div className="sm:w-[85%] w-[95%]  grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-2 gap-1 justify-center my-14">
                {
                    gridSectionData.map((item,index) => (
                        <div key={index} className={`
                    ${item.boxPosition === 3 && "lg:col-start-2"} 
                    ${item.boxPosition < 0 && "col-span-2"}`}>
                            {
                                item.boxPosition === -1 ? (
                                    <div className="flex flex-col h-full gap-2 px-2 my-8 sm:my-5">
                                        <p className="sm:text-4xl text-3xl font-[600] text-[rgba(241,242,255,1)] ">
                                            {item.heading.split("for")[0]} <span>for</span>
                                            <HighlightedText text={`${item.heading.split("for")[1]}`} color={"#357cde"} />
                                        </p>
                                        <p className="text-base font-[500] text-[rgba(131,136,148,1)] "> {item.description} </p>
                                        <div className="w-fit mt-4">
                                            <CTAButton className="w-fit" children={"Learn More"} active={true} linkTo={"/signup"} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`flex flex-col h-full justify-between gap-2 sm:p-4 p-2
                                     ${item.boxPosition % 2 !== 0 ? "bg-[rgba(44,51,63,1)]" : "bg-[rgba(22,29,41,1)]"}`}>
                                        <p className="sm:text-xl text-base font-[600] text-[rgba(241,242,255,1)] "> {item.heading} </p>
                                        <div className="h-full flex items-center">
                                            <p className="text-sm font-[500] text-[rgba(131,136,148,1)] "> {item.description} </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
             {/* Section 6 (form) */}
             <div className="flex flex-col justify-between gap-5 items-center my-5">
                <div className="flex flex-col gap-2">
                    <p className="text-4xl font-[600] text-[rgba(241,242,255,1)] text-center ">Get in Touch</p>
                    <p className="text-base font-[500] text-[rgba(131,136,148,1)]  text-center">We'd love to here for you, Please fill out this form.</p>
                </div>
                <ContactUsForm/>
            </div>
            {/* Section 7 (footer) */}
            <Footer/>
        </div>
    ) 
};

export default About;
