import React from "react";
import FooterItem from "./FooterItem";
import { FooterData1, FooterData2 } from "../../../data/footer-links";
import Logo from "../../../assets/Logo/Logo-Full-Light.png";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="w-full bg-[#161D29] border-t border-[#2C333F]">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Section */}
                    <div className="flex flex-col gap-10">

                        {/* Logo */}
                        <div className="flex justify-center lg:justify-start">
                            <img
                                src={Logo}
                                alt="Study Platform Logo"
                                className="w-44 object-contain"
                            />
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
                            {FooterData1.map((item, index) => (
                                <FooterItem key={index} data={item} />
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-wrap gap-10 justify-center lg:justify-end">
                        {FooterData2.map((item, index) => (
                            <FooterItem key={index} data={item} />
                        ))}
                    </div>

                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#2C333F] my-10"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#838894]">

                    {/* Policies */}
                    <div className="flex flex-wrap justify-center gap-5">

                        <button className="hover:text-white transition-all duration-200">
                            Privacy Policy
                        </button>

                        <button className="hover:text-white transition-all duration-200">
                            Cookie Policy
                        </button>

                        <button className="hover:text-white transition-all duration-200">
                            Terms of Service
                        </button>

                    </div>

                    {/* Socials + Credit */}
                    <div className="flex flex-col sm:flex-row items-center gap-5">

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 text-lg">

                            <button className="hover:text-white transition-all duration-200">
                                <IoLogoGithub />
                            </button>

                            <button className="hover:text-white transition-all duration-200">
                                <IoLogoLinkedin />
                            </button>

                            <button className="hover:text-white transition-all duration-200">
                                <IoLogoTwitter />
                            </button>

                        </div>

                        {/* Credit */}
                        <p className="text-center">
                            Made with ❤️ by{" "}
                            <span className="text-[#FFD60A] font-medium">
                                Danish Islam
                            </span>
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;