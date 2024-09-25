import React from "react"
import { Link } from "react-router-dom";

const FooterItem = ({data}) => {
  return (
    <div className="flex flex-col gap-2 h-min">
       <p className="text-[rgba(175,178,191,1)] text-base font-[600] ">{data.title}</p>
       {
        data.links.map((item,index) => {
            return (
            <div key={index}>
                <Link to={`${item.link}`}>
               <p className="text-[rgba(110,114,127,1)] text-sm hover:underline" > {item.title} </p>
                </Link>
            </div>
            )
        })
       }
    </div>
  )
};

export default FooterItem;
