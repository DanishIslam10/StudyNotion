import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import WishlistItem from "./WishlistItem";
import Btn from "../../../common/Btn";
import { PiSmileySadBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { buyCourse } from "../../../../services/operations/operations";


const Wishlist = (props) => {

    const { cart } = useSelector((state) => state.cart)
    const [totalAmount, setTotalAmount] = useState(0)

    const [buyNow, setBuyNow] = useState(false)

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)

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
        buyCourse(cart,user,token)
        reset()
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm()

    return (
        <div className="flex gap-4">
            <div className="w-full flex flex-col sm:gap-4">
                <div className="flex flex-col gap-2 m-4">
                    <div className="flex gap-2 text-sm font-[400] text-[#838894] ">
                        <NavLink to={"/"} >
                            <p>Home /</p>
                        </NavLink>
                        <NavLink to={"/profile/wishlist"}>
                            <p>Wishlist</p>
                        </NavLink>
                    </div>
                    <div className="text-3xl font-[500] text-[#F1F2FF] ">

                        {
                            buyNow ? (
                                <p>Checkout</p>
                            ) : (
                                <p>Wishlist</p>
                            )
                        }

                    </div>
                </div>
                <div className="h-[1px] w-[94%] bg-[#3b3b3b] mx-auto" ></div>
                {
                    cart.length > 0 ? (
                        <div className="flex md:flex-row flex-col md:gap-2 gap-4 py-4">
                            <div className="flex flex-col gap-2 px-4 md:w-[70%] ">
                                {
                                    cart?.map((course) => (
                                        <WishlistItem course={course} />
                                    ))
                                }
                            </div>
                            {
                                buyNow ? (
                                    <div className="md:w-[30%] h-fit flex flex-col gap-4 justify-between bg-[#161D29] py-4 px-6 mx-4 rounded-md ">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-base font-[600] text-[#DBDDEA] ">Payment Details</p>
                                            <p className="text-sm font-[400] text-[#AFB2BF] ">Complete your purchase details items and providing your  payment details to us .</p>
                                        </div>
                                        <form onSubmit={handleSubmit(paymentHandler)} className="payment-details-form flex flex-col gap-2 p-4 rounded-md border-[1px] border-[#414141] " >
                                            <div>
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Full Name"
                                                    id="fullName"
                                                    {...register("fullName", { required: true })}
                                                />
                                                {
                                                    errors.fullName && (
                                                        <span>Full Name is required</span>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <label>Email ID</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Email ID"
                                                    id="email"
                                                    {...register("email", { required: true })}
                                                />
                                                {
                                                    errors.email && (
                                                        <span>Email is required</span>
                                                    )
                                                }
                                            </div>
                                            <div className="w-full h-[1px] bg-[#3e3e3e] my-2 " ></div>
                                            <div className="flex gap-2 justify-between">
                                                <p className="text-[#C5C7D4]">Total</p>
                                                <p className="text-sm font-[600] text-[#F1F2FF] ">Rs. {totalAmount} </p>
                                            </div>
                                            <Btn
                                                type="submit"
                                                onClickFunction={() => handleSubmit(paymentHandler)}
                                                children={`Pay Rs. ${totalAmount}`}
                                                color="#FFD60A"
                                                textColor="#000814"
                                                style={{ marginTop: "5px" }}
                                            />
                                            <Btn
                                                onClickFunction={cancelBuyNowHandler}
                                                children="Cancel"
                                                color="#424854"
                                                textColor="#F1F2FF"
                                                style={{ marginTop: "5px" }}
                                            />
                                        </form>
                                    </div>
                                ) : (
                                    <div className="md:w-[30%] h-fit flex flex-col justify-between bg-[#161D29] py-4 px-6 mx-4 rounded-md ">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-[#999DAA] font-bold " >Total Items: {cart.length} </p>
                                            <p className="text-sm text-[#999DAA] font-bold ">Total Amount:
                                                <span className="block text-2xl font-[600] text-[#FFD60A] my-2 " >Rs. {totalAmount} </span>
                                            </p>
                                        </div>
                                        <Btn onClickFunction={buyNowClickHandler} children="Buy Now" color="#FFD60A" textColor="#000814" />
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 items-center my-20 text-white text-3xl font-bold">
                            <PiSmileySadBold className="text-4xl font-normal " />
                            <p className="w-fit">Your Cart is Empty</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default Wishlist;
