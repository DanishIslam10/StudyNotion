import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector"
import { contactUsEndPoint } from "../../services/apis";
import toast from "react-hot-toast";
import Spinner from "../common/Spinner"

const ContactUsForm = (props) => {

    const [loading, setLoading] = useState(false)

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
        // console.log("contact us form data : ", data)
        try {
            setLoading(true)
            const response = await apiConnector("POST", contactUsEndPoint.CONTACT_US_API, data)
            toast.success(response.data.message)
            // console.log("contact us email sent successfully")
            // console.log("mail response : ", response)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            // console.log("cant send contact us email")
            setLoading(false)
        }
    }

    return (
        <div>
            {loading ? (
                <div className="flex w-full items-center justify-center py-16">
                    <Spinner />
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(submitContactForm)}
                    autoComplete="off"
                    className="flex flex-col gap-5"
                >

                    {/* NAME ROW */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter first name"
                                {...register("firstName", { required: true })}
                                className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-sm text-white
              outline-none transition-all duration-200 placeholder:text-slate-600
              focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                            />
                            {errors.firstName && (
                                <span className="text-xs text-red-400">First name is required</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter last name"
                                {...register("lastName")}
                                className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-sm text-white
              outline-none transition-all duration-200 placeholder:text-slate-600
              focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                            />
                            {errors.lastName && (
                                <span className="text-xs text-red-400">Last name is required</span>
                            )}
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            {...register("email", { required: true })}
                            className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-sm text-white
            outline-none transition-all duration-200 placeholder:text-slate-600
            focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                        />
                        {errors.email && (
                            <span className="text-xs text-red-400">Email address is required</span>
                        )}
                    </div>

                    {/* PHONE NUMBER */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                                +91
                            </span>
                            <input
                                type="text"
                                id="phoneNumber"
                                maxLength={10}
                                placeholder="98765 43210"
                                {...register("phoneNumber", {
                                    required: true,
                                    pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" }
                                })}
                                className="w-full rounded-2xl border border-white/10 bg-[#111c35] py-3 pl-14 pr-4 text-sm text-white
              outline-none transition-all duration-200 placeholder:text-slate-600
              focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                            />
                        </div>
                        {errors.phoneNumber && (
                            <span className="text-xs text-red-400">
                                {errors.phoneNumber.message || "Phone number is required"}
                            </span>
                        )}
                    </div>

                    {/* MESSAGE */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-300">
                                Message
                            </label>
                            <p className="text-xs text-slate-600">Max 500 characters</p>
                        </div>
                        <textarea
                            id="message"
                            rows={5}
                            maxLength={500}
                            placeholder="Write your message here..."
                            {...register("message", { required: true })}
                            className="w-full resize-none rounded-2xl border border-white/10 bg-[#111c35] p-4 text-sm text-white
            outline-none transition-all duration-200 placeholder:text-slate-600
            focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                        />
                        {errors.message && (
                            <span className="text-xs text-red-400">Message is required</span>
                        )}
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
          py-3.5 text-sm font-bold text-black shadow-lg transition-all duration-300
          hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                    >
                        Send Message →
                    </button>

                    {/* FOOTER NOTE */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                        <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-xs text-slate-600">
                            We'll respond within 24 hours on business days
                        </p>
                    </div>

                </form>
            )}
        </div>
    )
};

export default ContactUsForm;
