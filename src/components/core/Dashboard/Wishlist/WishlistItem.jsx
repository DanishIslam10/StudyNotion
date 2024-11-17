import React, { useEffect, useState } from "react"
import StarRatings from "react-star-ratings";
import Btn from "../../../common/Btn";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
// import { setCourseDetails } from "../../../../slices/catalogSlice";

const WishlistItem = ({ course }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function removeItemHandler() {
        dispatch(removeFromCart(course._id))
        toast.success("Item Removed")
    }

    // function seeDetails() {
    //     dispatch(setCourseDetails(course))
    //     navigate("/catalog/course-details")
    // }

    return (
        <div className="w-fit flex gap-4 ">
            <div className="relative w-fit flex gap-2 py-2 ">

                <div className="w-[25%] sm:w-[50%] flex items-start " >
                    <img src={course?.thumbnail} className="object-contain rounded-md " />
                </div>

                <div className="w-[70%] flex flex-col justify-between sm:px-2 ">
                    <div className="flex flex-col sm:gap-2 gap-1 " >
                        <div className="flex justify-between ">
                            <p
                                // onClick={seeDetails}
                                className="sm:text-lg text-sm font-[600] text-[#F1F2FF] cursor-pointer hover:underline">
                                {course?.courseName}
                            </p>
                            <button onClick={removeItemHandler}
                                className="sm:hidden text-[#EF476F] text-xs sm:text-base bg-[#161D29] p-2 mx-2 rounded-md h-fit
                                hover:scale-105">
                                <div className="flex gap-1 items-center">
                                    <RiDeleteBin6Line />
                                    <p>Remove</p>
                                </div>
                            </button>
                        </div>
                        {/* this is responsive description */}
                        {/* screen size greater than md */}
                        <p className="md:block hidden sm:text-sm text-xs font-[400] text-[#999DAA]"> {course?.courseDescription} </p>
                        {/* screen size greater than sm and less than md */}
                        <p className="md:hidden hidden sm:block  sm:text-sm text-xs font-[400] text-[#999DAA]">
                            {`${course?.courseDescription.split(" ").slice(0, 12).join(" ")}....`}
                        </p>
                        {/* screen size less than md */}
                        <p className="sm:hidden block sm:text-sm text-xs font-[400] text-[#999DAA]">
                            {`${course?.courseDescription?.split(" ").slice(0, 7).join(" ")}....`}
                        </p>
                        <div className="flex gap-2 items-center">
                            <p className="font-[400] sm:text-base text-xs text-[#DBDDEA]">Instructor: {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                            <img src={course?.instructor?.image || "default-avatar.jpg"} className="sm:w-8 sm:h-8 w-5 h-5 object-cover object-top rounded-full" alt="Instructor" />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center sm:py-2">
                        <p className="sm:text-sm text-xs pt-1 text-[#E7C009] ">3.5</p> {/* Smaller font and centered alignment */}
                        <StarRatings
                            rating={3.5}
                            starRatedColor="gold"
                            changeRating={(newRating) => console.log(newRating)}
                            numberOfStars={5}
                            name="rating"
                            starDimension="12px"
                            starSpacing="2px"
                        />
                        <p className="sm:text-sm text-xs pt-1 text-[#6E727F] font-[400] ">(10k)</p> {/* Same adjustments for balance */}
                    </div>
                </div>
                <button onClick={removeItemHandler}
                    className="hidden sm:block absolute bottom-2 right-4 text-[#EF476F] text-xs sm:text-base bg-[#161D29] p-2 rounded-md h-fit
                                hover:scale-105">
                    <div className="flex gap-1 items-center">
                        <RiDeleteBin6Line />
                        <p>Remove</p>
                    </div>
                </button>
            </div>
        </div>
    )
};

export default WishlistItem;
