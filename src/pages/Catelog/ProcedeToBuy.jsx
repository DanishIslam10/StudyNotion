import React, { useEffect, useState } from "react"
import Btn from "../../components/common/Btn";
import { FaRegClock, FaMobileAlt, FaGlobe } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

const ProcedeToBuy = ({ courseDetails }) => {

  const { user } = useSelector((state) => state.profile)
  const { cart } = useSelector((state) => state.cart)
  const [added, setAdded] = useState(false)
  console.log("cart data: ", cart)
  console.log("added in cart : ")

  const dispatch = useDispatch()

  function addToCartHandler() {
    dispatch(addToCart(courseDetails));
    toast.success("Item added to cart!");
    setAdded(true)
  }

  function removeFromCartHandler() {
    dispatch(removeFromCart(courseDetails?._id));
    toast.success("Item removed from cart!");
    setAdded(false)
  }

  useEffect(() => {
    if (cart?.find((course) => course._id === courseDetails._id)) {
      setAdded(true)
      return
    }
    setAdded(false)
  }, [])

  return (
    <div>
      <img className="hidden sm:block rounded-t-md" src={courseDetails?.thumbnail} alt="Course Thumbnail" />
      <div className="flex flex-col gap-4 p-4">
        <p className="sm:text-2xl md:text-3xl text-xl font-[700] text-[#F1F2FF]">Rs. {courseDetails?.price || "Price"}</p>
        {
          added ? (
            <Btn onClickFunction={removeFromCartHandler} children="Remove Item" color="#EF476F" textColor="#340019" />
          ) : (
            user?.accountType === "Student" &&

            <Btn onClickFunction={addToCartHandler} children="Add To Cart" color="#FFD60A" textColor="#000814" />
          )
        }
        {
          user?.accountType === "Student" &&
          <p className="text-sm font-[400] text-[#DBDDEA] text-center">30-Day Money-Back Guarantee</p>
        }
      </div>
      <div className="flex flex-col gap-2 px-5 pb-4">
        <p className="text-base font-[500] text-[#F1F2FF]">This course includes:</p>
        <div className="flex flex-col gap-2 md:text-sm text-xs font-[500] text-[#06D6A0]">
          <div className="flex items-center gap-1">
            <IoDocumentTextOutline />
            <p>Certificate of completion</p>
          </div>
          <div className="flex items-center gap-1">
            <FaMobileAlt />
            <p>Access on Mobile and TV</p>
          </div>
          <div className="flex items-center gap-1">
            <FaRegClock />
            <p>Full Lifetime access</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProcedeToBuy;
