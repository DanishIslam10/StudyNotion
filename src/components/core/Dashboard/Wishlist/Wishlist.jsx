import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import WishlistItem from "./WishlistItem";
import Btn from "../../../common/Btn";
import { PiSmileySadBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { buyCourse } from "../../../../services/operations/operations";
import { resetCart } from "../../../../slices/cartSlice";


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
        console.log("payment details form data: ", data)
        buyCourse(cart, user, token, dispatch)
        reset()
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm()

    return (
        <div className="flex w-full justify-center px-4 py-8 text-white">
            <div className="w-full max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-[#838894]">
                        <NavLink to={"/"} className="hover:text-white transition-colors">
                            Home
                        </NavLink>

                        <span>/</span>

                        <NavLink
                            to={"/profile/wishlist"}
                            className="hover:text-white transition-colors"
                        >
                            Wishlist
                        </NavLink>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            {buyNow ? "Checkout" : "Wishlist"}
                        </h1>

                        <p className="mt-2 text-sm text-[#999DAA]">
                            {buyNow
                                ? "Complete your purchase securely"
                                : "Courses you saved for later"}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-8 h-[1px] w-full bg-white/10"></div>

                {
                    cart.length > 0 ? (

                        <div className="flex flex-col gap-6 lg:flex-row">

                            {/* Left Section */}
                            <div className="flex flex-1 flex-col gap-4">
                                {
                                    cart?.map((course) => (
                                        <WishlistItem key={course._id} course={course} />
                                    ))
                                }
                            </div>

                            {/* Right Sidebar */}
                            {
                                buyNow ? (

                                    <div className="lg:w-[380px]">

                                        <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#161D29]/80 p-6 backdrop-blur-xl shadow-2xl shadow-black/20">

                                            {/* Payment Heading */}
                                            <div className="mb-6">
                                                <h2 className="text-2xl font-semibold text-white">
                                                    Payment Details
                                                </h2>

                                                <p className="mt-2 text-sm leading-6 text-[#AAB0C0]">
                                                    Complete your purchase by providing your payment details.
                                                </p>
                                            </div>

                                            {/* Form */}
                                            <form
                                                onSubmit={handleSubmit(paymentHandler)}
                                                className="flex flex-col gap-5"
                                            >

                                                {/* Full Name */}
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-medium text-[#DBDDEA]">
                                                        Full Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        id="fullName"
                                                        {...register("fullName", { required: true })}
                                                        className="rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-sm outline-none transition-all placeholder:text-[#6E727F] focus:border-yellow-400"
                                                    />

                                                    {
                                                        errors.fullName && (
                                                            <span className="text-xs text-pink-400">
                                                                Full name is required
                                                            </span>
                                                        )
                                                    }
                                                </div>

                                                {/* Email */}
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-medium text-[#DBDDEA]">
                                                        Email Address
                                                    </label>

                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        id="email"
                                                        {...register("email", { required: true })}
                                                        className="rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-sm outline-none transition-all placeholder:text-[#6E727F] focus:border-yellow-400"
                                                    />

                                                    {
                                                        errors.email && (
                                                            <span className="text-xs text-pink-400">
                                                                Email is required
                                                            </span>
                                                        )
                                                    }
                                                </div>

                                                {/* Divider */}
                                                <div className="h-[1px] bg-white/10"></div>

                                                {/* Total */}
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[#AAB0C0]">
                                                        Total Amount
                                                    </p>

                                                    <p className="text-2xl font-bold text-yellow-300">
                                                        ₹ {totalAmount}
                                                    </p>
                                                </div>

                                                {/* Buttons */}
                                                <div className="mt-2 flex gap-3 justify-between">
                                                    <Btn
                                                        type="submit"
                                                        onClickFunction={() => handleSubmit(paymentHandler)}
                                                        children={`Pay ₹ ${totalAmount}`}
                                                        
                                                        textColor="#000814"
                                                    />

                                                    <Btn
                                                        onClickFunction={cancelBuyNowHandler}
                                                        children="Cancel"
                                            
                                                        textColor="#F1F2FF"
                                                    />
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                ) : (

                                    <div className="lg:w-[340px]">

                                        <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#161D29]/80 p-6 backdrop-blur-xl shadow-2xl shadow-black/20">

                                            <div className="flex flex-col gap-5">

                                                {/* Items */}
                                                <div>
                                                    <p className="text-sm font-medium uppercase tracking-wider text-[#838894]">
                                                        Total Items
                                                    </p>

                                                    <h3 className="mt-2 text-3xl font-bold text-white">
                                                        {cart.length}
                                                    </h3>
                                                </div>

                                                {/* Divider */}
                                                <div className="h-[1px] bg-white/10"></div>

                                                {/* Amount */}
                                                <div>
                                                    <p className="text-sm font-medium uppercase tracking-wider text-[#838894]">
                                                        Total Amount
                                                    </p>

                                                    <h2 className="mt-2 text-4xl font-bold text-yellow-300">
                                                        ₹ {totalAmount}
                                                    </h2>
                                                </div>

                                                {/* CTA */}
                                                <div className="pt-2">
                                                    <Btn
                                                        onClickFunction={buyNowClickHandler}
                                                        children="Proceed to Checkout"
                                                        color="#FFD60A"
                                                        textColor="#000814"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    ) : (

                        <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">

                            <div className="rounded-full bg-white/5 p-6">
                                <PiSmileySadBold className="text-5xl text-[#FFD60A]" />
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    Your Cart is Empty
                                </h2>

                                <p className="mt-2 text-[#999DAA]">
                                    Looks like you haven't added any courses yet.
                                </p>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default Wishlist;
