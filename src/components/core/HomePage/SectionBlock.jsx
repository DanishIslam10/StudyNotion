import React from "react"
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

const SectionBlock = ({
    direction, heading, subHeading, ctaButton1, ctaButton2, codeBlock, backgroundGradient, codeColor
}) => {
    return (
        <div className={`flex ${direction} justify-center flex-wrap sm:w-screen md:w-[70vw] lg:w-[100vw] relative my-10 lg:gap-36 gap-10`}>
            {/* left part */}
            <div className="flex flex-col lg:w-[30vw] md:w-[80vw] w-[80vw] gap-4">
                <div className="text-3xl font-[600]" >
                    {heading}
                </div>
                <div className="text-[16px] font-[500] text-[#838894]" >
                    {subHeading}
                </div>
                <div className="flex gap-4 my-10">
                    <CTAButton children={ctaButton1} active={true} linkTo={"/signup"} />
                    <CTAButton children={ctaButton2} active={false} linkTo={"/signup"} />
                </div>
            </div>

            {/* right part */}
            <div className="flex lg:w-[30%] w-[90%] sm:w-[70%] p-2 h-min relative bg-[rgba(22,43,77,0.4)] font-mono font-[700] text-[12px] leading-6 ">

            <div className="absolute left-36 top-20" 
                     style={{ boxShadow: `0px 0px 200px 80px ${backgroundGradient}` }}>
                </div>

                <div className="flex flex-col lg:w-min items-center px-2 text-[#6E727F] ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>
                <div className="flex flex-col"
                    style = {{color: codeColor}}>
                    <TypeAnimation
                        sequence={[codeBlock, 1000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace: "pre",
                                display: "block",
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
};

export default SectionBlock;
