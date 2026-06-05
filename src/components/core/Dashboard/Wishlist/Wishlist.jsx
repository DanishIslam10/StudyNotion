import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import WishlistItem from "./WishlistItem";
import Btn from "../../../common/Btn";
import { PiSmileySadBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { buyCourse } from "../../../../services/operations/operations";


const Wishlist = (props) => {

    const { cart } = useSelector((state) => state.cart)
    const [totalAmount, setTotalAmount] = useState(0)

    const [buyNow, setBuyNow] = useState(false)

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        const totalAmount = cart.reduce((currentPrice, course) => {
            return currentPrice + course.price
        }, 0)
        setTotalAmount(totalAmount)
    }, [cart])

    function buyNowClickHandler() {
        setBuyNow(true)
    }

    function cancelBuyNowHandler() {
        setBuyNow(false)
        reset()
    }

    function paymentHandler(data) {
        // console.log("payment details form data: ", data)

        // ❌ Wrong — cart is array of full course objects
        // buyCourse(cart, user, token, dispatch)

        // ✅ Correct — extract just the _id from each course
        const courseIds = cart.map(course => course._id)
        buyCourse(courseIds, user, token, dispatch)

        reset()
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm()

    return (
        <div className="flex w-full justify-center px-4 py-10 text-white">
            <div className="w-full max-w-7xl">

                {/* HEADER */}
                <div className="mb-8 flex flex-col gap-3">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <NavLink to="/" className="hover:text-slate-400 transition-colors duration-200">
                            Home
                        </NavLink>
                        <span>/</span>
                        <NavLink to="/profile/wishlist" className="hover:text-slate-400 transition-colors duration-200">
                            Wishlist
                        </NavLink>
                    </div>

                    {/* Badge */}
                    <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <p className="text-xs font-medium text-indigo-300">
                            {buyNow ? "Secure checkout" : "Saved courses"}
                        </p>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                        {buyNow ? "Checkout" : "Your Wishlist"}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {buyNow ? "Complete your purchase securely" : "Courses you saved for later"}
                    </p>
                </div>

                {/* DIVIDER */}
                <div className="mb-8 border-t border-white/[0.08]" />

                {cart.length > 0 ? (

                    <div className="flex flex-col gap-6 lg:flex-row">

                        {/* ── LEFT — course list ── */}
                        <div className="flex flex-1 flex-col gap-4">
                            {cart?.map((course) => (
                                <WishlistItem key={course._id} course={course} />
                            ))}
                        </div>

                        {/* ── RIGHT — sidebar ── */}
                        {buyNow ? (

                            /* PAYMENT DETAILS */
                            <div className="lg:w-[380px]">
                                <div className="sticky top-24 overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

                                    <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                                    <div className="p-6 flex flex-col gap-5">

                                        {/* Heading */}
                                        <div>
                                            <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5 mb-3">
                                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                                <p className="text-xs font-medium text-indigo-300">Payment Details</p>
                                            </div>
                                            <h2 className="text-xl font-bold text-white">Complete your purchase</h2>
                                            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                                                Enter your details to finalize the order.
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit(paymentHandler)} className="flex flex-col gap-4">

                                            {/* Full Name */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    {...register("fullName", { required: true })}
                                                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                                                />
                                                {errors.fullName && (
                                                    <span className="text-xs text-red-400">Full name is required</span>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium text-slate-300">Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    {...register("email", { required: true })}
                                                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                                                />
                                                {errors.email && (
                                                    <span className="text-xs text-red-400">Email is required</span>
                                                )}
                                            </div>

                                            {/* Divider */}
                                            <div className="border-t border-white/[0.08]" />

                                            {/* Total */}
                                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3">
                                                <p className="text-sm text-slate-400">Total Amount</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                                                    ₹{totalAmount}
                                                </p>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-3 pt-1">
                                                <button
                                                    type="submit"

                                                    className="flex-1 rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                                                >
                                                    Pay ₹{totalAmount}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelBuyNowHandler}
                                                    className="rounded-2xl border border-white/10 bg-[#111c35] px-5 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-[#152040] hover:text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                        </form>

                                        {/* Footer */}
                                        <div className="flex items-center justify-center gap-2 border-t border-white/[0.08] pt-2">
                                            <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <p className="text-xs text-slate-600">Secured with end-to-end encryption</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (

                            /* ORDER SUMMARY */
                            <div className="lg:w-[320px]">
                                <div className="sticky top-24 overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

                                    <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

                                    <div className="p-6 flex flex-col gap-5">

                                        {/* Badge */}
                                        <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                            <p className="text-xs font-medium text-indigo-300">Order Summary</p>
                                        </div>

                                        {/* Items + Amount */}
                                        <div className="flex flex-col gap-3">

                                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3">
                                                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                                    Total Items
                                                </p>
                                                <p className="text-2xl font-bold text-white">{cart.length}</p>
                                            </div>

                                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3">
                                                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                                    Total Amount
                                                </p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent">
                                                    ₹{totalAmount}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-white/[0.08]" />

                                        {/* CTA */}
                                        <button
                                            onClick={buyNowClickHandler}
                                            className="w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                                        >
                                            Proceed to Checkout
                                        </button>

                                        {/* Footer */}
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <p className="text-xs text-slate-600">Secured with end-to-end encryption</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                ) : (

                    /* EMPTY STATE */
                    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-[#111c35]">
                            <PiSmileySadBold className="text-4xl text-slate-500" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Looks like you haven't added any courses yet.
                            </p>
                        </div>

                        <NavLink to="/catalog">
                            <button className="rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] px-6 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">
                                Browse Courses
                            </button>
                        </NavLink>

                    </div>
                )}
            </div>
        </div>
    )
};

export default Wishlist;
