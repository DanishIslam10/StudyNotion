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
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

      {/* THUMBNAIL */}
      <div className="relative hidden sm:block overflow-hidden">
        <img
          src={courseDetails?.thumbnail}
          alt="Course Thumbnail"
          className="h-[200px] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526] via-[#0d1526]/30 to-transparent" />
      </div>

      <div className="flex flex-col gap-5 p-6">

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Course Price
            </p>
            <h2 className="mt-1 text-3xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
              ₹{courseDetails?.price || "—"}
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111c35] px-3 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#a6ff5e]" />
            <p className="text-xs font-medium text-slate-300">Lifetime Access</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          {added ? (
            <button
              onClick={removeFromCartHandler}
              className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 py-3.5 text-sm
            font-semibold text-red-400 transition-all duration-200
            hover:bg-red-500/20 hover:text-red-300 active:scale-[0.99]"
            >
              Remove from Cart
            </button>
          ) : (
            (user?.accountType === "Student" || !token) && (

              <button
                onClick={() => {
                  addToCartHandler();
                  navigate("/profile/wishlist");
                }}
                className="w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
              py-3.5 text-sm font-bold text-black shadow-lg transition-all duration-300
              hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
              >
                Enroll Now
              </button>
            )
          )}

          {(user?.accountType === "Student" || !token) && (
            <div className="flex items-center justify-center gap-2">
              <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p className="text-xs text-slate-600">30-Day Money-Back Guarantee</p>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/[0.08]" />

        {/* COURSE INCLUDES */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            This course includes
          </p>

          <div className="flex flex-col gap-2.5">

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                <IoDocumentTextOutline className="text-sm text-indigo-400" />
              </div>
              <p className="text-sm text-slate-300">Certificate of completion</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                <FaMobileAlt className="text-sm text-indigo-400" />
              </div>
              <p className="text-sm text-slate-300">Access on mobile & TV</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]">
                <FaRegClock className="text-sm text-indigo-400" />
              </div>
              <p className="text-sm text-slate-300">Full lifetime access</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default ProcedeToBuy;
