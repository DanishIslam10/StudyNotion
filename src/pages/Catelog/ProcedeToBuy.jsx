import React, { useEffect, useState } from "react"
import Btn from "../../components/common/Btn";
import { FaRegClock, FaMobileAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router";

const ProcedeToBuy = ({ courseDetails }) => {

  const { user } = useSelector((state) => state.profile)
  // console.log("user is: ",user)
  const { cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  // console.log("cart data: ", cart)
  // console.log("added in cart : ")

  const dispatch = useDispatch()

  function addToCartHandler() {
    if (!token) {
      toast("❗ Please login")
      navigate("/login")
      return
    }
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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#161D29]/80 backdrop-blur-xl shadow-2xl shadow-black/30">

      {/* Thumbnail */}
      <div className="overflow-hidden">
        <img
          className="hidden sm:block h-[220px] w-full object-cover transition-transform duration-500 hover:scale-105"
          src={courseDetails?.thumbnail}
          alt="Course Thumbnail"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-6">

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#838894]">
              Course Price
            </p>

            <h2 className="mt-1 text-3xl font-bold text-white">
              ₹ {courseDetails?.price || "Price"}
            </h2>
          </div>

          <div className="rounded-full border border-[#06D6A0]/20 bg-[#06D6A0]/10 px-3 py-1 text-xs font-semibold text-[#06D6A0]">
            Lifetime Access
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {
            added ? (
              <Btn
                onClickFunction={removeFromCartHandler}
                children="Remove From Cart"
                color="#FF5A76"
                textColor="#1A0006"
              />
            ) : (
              (user?.accountType === "Student" || !token) &&
              <Btn
                onClickFunction={addToCartHandler}
                children="Enroll Now"
                color="#FFD60A"
                textColor="#000814"
              />
            )
          }

          {
            user?.accountType === "Student" || !token &&
            <p className="text-center text-sm text-[#AAB0C0]">
              30-Day Money-Back Guarantee
            </p>
          }
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Features */}
        <div className="flex flex-col gap-4">

          <p className="text-sm font-semibold tracking-wide text-white">
            This course includes
          </p>

          <div className="flex flex-col gap-3 text-sm text-[#D1D5DB]">

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#06D6A0]/10 p-2 text-[#06D6A0]">
                <IoDocumentTextOutline />
              </div>
              <p>Certificate of completion</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#3B82F6]/10 p-2 text-[#60A5FA]">
                <FaMobileAlt />
              </div>
              <p>Access on mobile & TV</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F59E0B]/10 p-2 text-[#FBBF24]">
                <FaRegClock />
              </div>
              <p>Full lifetime access</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default ProcedeToBuy;
