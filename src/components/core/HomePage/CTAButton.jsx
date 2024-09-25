import { Link } from "react-router-dom"

const CTAButton = ({children,active,linkTo}) => {
    return (
      <Link to={linkTo}>
        <div className={`text-center text-[14px] px-6 py-3 rounded-md font-bold *
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} transition-all duration-200
        hover:scale-105 shadow-md shadow-[#FFFFFF2E] `}>
            {children}
        </div>
      </Link>
    )
}

export default CTAButton