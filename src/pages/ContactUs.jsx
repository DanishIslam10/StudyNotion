import React from "react"
import ContactUsForm from "../components/common/ContactUsForm";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaGlobeAsia } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import Footer from "../components/core/HomePage/Footer";

const contactUsData = [
    {
        heading: "Chat with us",
        description: "Our friendly team is here to help.",
        contactInfo: "somebody@fun.com",
        icon: <HiOutlineChatBubbleLeftRight />
    },
    {
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        contactInfo: "Here is the location/ address",
        icon: <FaGlobeAsia />,
    },
    {
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm.",
        contactInfo: "+123 456 7890",
        icon: <IoCallOutline />,
    },
]

const ContactUs = (props) => {
    return (
        <div className="flex flex-col w-full justify-center items-center text-[#F1F2FF] ">
            <div className="md:w-[80%] w-[90%] sm:w-[95%] flex sm:flex-row flex-col-reverse lg:gap-10 gap-4 justify-center my-16 ">
                <div className="md:w-[40%] sm:w-[50%] w-full flex flex-col h-fit gap-8 bg-[#161D29] lg:px-5 px-2 py-5 rounded-md">
                    {
                        contactUsData.map((item, index) => (
                            <div className="flex">
                                    <p className="flex justify-center items-center py-1 px-2 text-xl h-fit"> {item.icon} </p>
                                <div className="flex flex-col">
                                    <p className="flex gap-1 item text-base font-[600]">{item.heading}</p>
                                    <p className="text-sm font-[500] text-[#999DAA] ">{item.description}</p>
                                    <p className="text-sm font-[500] text-[#999DAA] ">{item.contactInfo}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="md:w-[65%] sm:w-[50%] w-full flex flex-col border-[1px] border-[#424854] rounded-md">
                    <div className="flex flex-col gap-4 p-4">
                        <p className="md:text-4xl text-3xl font-[600]">Got a Idea? We’ve got the skills. Let’s team up</p>
                        <p className="text-base font-[500">Tell us more about yourself and what you’re got in mind.</p>
                    </div>
                    <ContactUsForm />
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default ContactUs;
