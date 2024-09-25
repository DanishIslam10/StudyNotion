import React from "react"
import FooterItem from "./FooterItem";
import { FooterData1, FooterData2 } from "../../../data/footer-links"
import Logo from "../../../assets/Logo/Logo-Full-Light.png"
import { IoIosHeart } from "react-icons/io";

const Footer = (props) => {

    return (
        <div className="w-full flex flex-col bg-[rgba(22,29,41,1)] justify-center items-center">

            <div className="w-[100%] sm:flex sm:flex-nowrap flex-wrap py-5 sm:px-10">
                <div className="w-full flex flex-col h-min flex-wrap sm:m-0 mt-10 p-4">
                    <div className="flex justify-center sm:justify-start">
                        <img src={Logo}></img>
                    </div>
                    <div className="flex h-min gap-8 ml-2 flex-wrap sm:m-0 mt-10">

                        {
                            FooterData1.map((item,index) => {
                                return (
                                    <FooterItem key={index} data={item} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="sm:block hidden w-[1px] bg-[rgba(44,51,63,1)] "></div>
                <div className="sm:hidden block w-full h-[1px] my-6 bg-[rgba(44,51,63,1)] "></div>
                <div className="w-full flex lg:justify-center h-min sm:gap-10 gap-7 flex-wrap sm:mt-20 mt-10 ml-3">
                    {
                        FooterData2.map((item,index) => {
                            return (
                                <FooterItem key={index} data={item} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-[95%] h-[1px] bg-[rgba(44,51,63,1)] "></div>
            <div className="flex flex-col sm:flex-row w-[95%] justify-between items-center gap-2 py-6 text-[rgba(131,136,148,1)] text-sm ">
                <div className="flex gap-4">
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                    <p>Terms</p>
                </div>
                <div className="">
                   <p>
                    Made with <IoIosHeart className="text-[#ce2e2e] inline-block" /> CodeHelp 2023 StudyNotion
                   </p>
                </div>
            </div>
        </div>
    )
};

export default Footer;
