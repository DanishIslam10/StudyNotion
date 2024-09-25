import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import countryCodes from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiConnector"
import { contactUsEndPoint } from "../../services/apis";
import toast from "react-hot-toast";
import Spinner from "../common/Spinner"

const ContactUsForm = (props) => {

    const [loading, setLoading] = useState()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                message: "",
            })
        }
    }, [isSubmitSuccessful, reset])

    async function submitContactForm(data) {
        console.log("contact us form data : ", data)
        try {
            setLoading(true)
            const response = await apiConnector("POST", contactUsEndPoint.CONTACT_US_API, data)
            toast.success(response.data.message)
            console.log("contact us email sent successfully")
            console.log("mail response : ", response)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            console.log("cant send contact us email")
            setLoading(false)
        }
    }

    return (
        <div>
            {
                loading ? (<div className="w-[50%] h-[90vh] flex justify-center items-center ">
                    <Spinner />
                </div>) : (<div>
                    <form onSubmit={handleSubmit(submitContactForm)} autoComplete="off" className="contact-us-form flex flex-col justify-center gap-4 text-[white] my-8 p-4">
                        <div className="flex gap-2 w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="firstName" >First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter first name"
                                    {...register("firstName", { required: true })}
                                />
                                {
                                    errors.firstName && (
                                        <span> Please enter first name </span>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="lastName" >Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter last name"
                                    {...register("lastName")}
                                />
                                {
                                    errors.lastName && (
                                        <span> Please enter last name </span>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" >Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email address"
                                {...register("email", { required: true })}
                            />
                            {
                                errors.email && (
                                    <span>Please enter email address</span>
                                )
                            }
                        </div>
                        {/* phone number section */}
                            <div>
                            <label>Phone Number</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        maxLength={10}
                                        placeholder="XXXXXXXXXX"
                                        {...register("phoneNumber", { required: true})}
                                    />
                                    {
                                        errors.phoneNumber && (
                                            <span> Please enter phone number </span>
                                        )
                                    }
                                </div>
                            </div>
                        {/* Message box */}
                        <div>
                            <label htmlFor="message" >Message</label>
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Write you message here"
                                rows={6}
                                maxLength={500}
                                className="w-full bg-[rgba(22,29,41,1)] rounded-md p-2 "
                                {...register("message", { required: true })}
                            />
                            {
                                errors.message && (
                                    <span> Please write message </span>
                                )
                            }
                        </div>
                        {/* button */}
                        <button className="bg-[rgba(255,214,10,1)] p-2 rounded-md text-[rgba(0,8,20,1)] font-[600] ">Send Message</button>
                    </form>
                </div>)
            }
        </div>
    )
};

export default ContactUsForm;
