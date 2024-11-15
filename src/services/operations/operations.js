import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, paymentEndpoints, profileEndpoints, userEndPoints } from "../apis"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setToken } from "../../slices/authSlice"
import { useNavigate } from "react-router"
import { setDeleteAccountModal, setDpModal, setRemoveDpModal, setUpdatePasswordInformation, setUpdatePasswordModal, setUser } from "../../slices/profileSlice"
import { setInstructorCourses } from "../../slices/instructorCourses"
import { setCourse, setEditCourse, setStep } from "../../slices/newCourseSlice"
import { setCourseDetails } from "../../slices/catalogSlice"
import { setEnrolledCourses } from "../../slices/enrolledCourses"
import rzpLogo from "../../assets/Logo/rzp_logo.png"

export const useGetAllCategoriesHook = () => {
    const getAllCategories = async () => {
        try {
            const result = await apiConnector("GET", courseEndpoints.CATEGORIES_API)
            // console.log("Categories fetched successfully")
            return result;
        } catch (error) {
            console.log(error)
            // console.log("could not fetch categories")
        }
    }
    return getAllCategories
}

export const useSendSignUpOtpHook = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sendSignUpOtp = async (signUpFormData) => {

        //validate password and confirm password
        if (signUpFormData.password !== signUpFormData.confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        //validate email id
        const { email } = signUpFormData
        const validateEmailFormat = () => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };
        if (!validateEmailFormat) {
            toast.error("Please enter a valid email address")
            return;
        }

        try {
            dispatch(setLoading(true))
            await apiConnector("POST", userEndPoints.SEND_OTP_API, { email: signUpFormData.email })
            dispatch(setLoading(false))
            toast.success("OTP sent successfully")
            console.log("otp sent successfully")
            navigate("/otp-verification")
        } catch (error) {
            console.log("cant send otp from front end, ye raha error: ", error)
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
        }
    }
    return sendSignUpOtp
}

export const useLoginHook = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (formData) => {
        try {
            const response = await apiConnector("POST", userEndPoints.LOGIN_API, formData)
            // console.log("Log in response: ", response)
            // store the values in redux store
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            //store the values in browser's local storage
            localStorage.setItem("Token", JSON.stringify(response.data.token))
            localStorage.setItem("User", JSON.stringify(response.data.user))
            // console.log("Login Successfull")
            toast.success("Login Successfull")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return login
}

export const useLogOutHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // localStorage.removeItem("Token")
        // localStorage.removeItem("User")
        localStorage.clear()
        console.log("logout successfull")
        toast.success("Logged Out")
        navigate("/")
    }
    return logOut
}


//rules for using react built in hooks :
//we can only use build in react hooks inside a react component or inside custom react hook
//here we are seperately defining the function function instead of defining inside the react component
//therefore we need to make this function a custom react hook in order to use built in react hooks
export const useResetPasswordUrlHook = () => {

    const dispatch = useDispatch()

    const getResetPasswordUrl = async (email, setEmailSent) => {
        try {
            dispatch(setLoading(true))
            await apiConnector("POST", userEndPoints.RESET_PASSWORD_URL_API, { email: email })
            dispatch(setLoading(false))
            toast.success("Reset password link sent successfully")
            setEmailSent(true)
            console.log("Reset password link send on mail successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            console.log("cant send the reset password link")
            dispatch(setLoading(false))
        }
    }
    return getResetPasswordUrl
}

export const useResetYourPasswordHook = () => {

    const navigate = useNavigate()

    const resetYourPassword = async ({ newPassword, confirmNewPassword, token }) => {
        try {
            await apiConnector("POST", userEndPoints.RESET_PASSWORD_API, { newPassword, confirmNewPassword, token })
            toast.success("Password Reset Successfull")
            console.log("password reset successfull")
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            console.log("cant reset the password")
        }
    }
    return resetYourPassword;
}

export const useSignUpHook = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signUp = async (data) => {
        try {
            dispatch(setLoading(true))
            await apiConnector("POST", userEndPoints.SIGNUP_API, data)
            dispatch(setLoading(false))
            toast.success("Account Created Successfully")
            // console.log("Account created successfully")
            navigate("/login")

        } catch (error) {
            console.log(error)
            console.log("cant create account")
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
        }
    }
    return signUp
}

export const useGetUserDetailsHook = () => {
    const getUserDetails = async () => {
        try {
            const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API)
            return response
            // console.log("user profile details fetched successfully")
            // console.log("User Details Response: ",response)
        } catch (error) {
            console.log(error)
            // console.log("cant fetch user profile details from front end")
        }
    }
    return getUserDetails
}

//this function will update the local storage to reflect the changes on front end
const updateUserDetailsInLocalStorage = async () => {
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API)
        const updatedUser = response.data.data
        localStorage.setItem('User', JSON.stringify(updatedUser));
    } catch (error) {
        console.error('Error updating user details:', error);
    }
};

export const useUpdateDisplayPictureHook = () => {

    const dispatch = useDispatch()

    const updateDisplayPicture = async (imageFile) => {

        if (!imageFile) {
            toast.error("No image uploaded")
            return;
        }

        const supportedFormats = ["JPEG", "PNG", "JPG", "WEBP"]

        const imageFileFormat = imageFile.name.split(".")[1].toUpperCase()
        // console.log("img format: ",imageFileFormat)

        if (!supportedFormats.includes(imageFileFormat)) {
            toast.error("Format not supported")
            return
        }

        dispatch(setLoading(true))

        try {
            // Create a FormData object to wrap the image file
            const formData = new FormData();
            formData.append("imageFile", imageFile);

            const response = await apiConnector("PUT", profileEndpoints.UPDATE_DISPLAY_PICTURE_API, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // If your backend requires credentials like cookies
            });

            updateUserDetailsInLocalStorage()

            dispatch(setLoading(false))
            dispatch(setDpModal(false))
            toast.success(response.data.message)

        } catch (error) {
            console.log(error)
            // console.log("Cant update DP from front end")
            toast.error(error.data.message)
            dispatch(setLoading(false))
        }
    }
    return updateDisplayPicture
}

// remove dp
export const useRemoveDisplayPictureHook = () => {
    const dispatch = useDispatch()
    const removeDisplayPicture = async () => {
        try {
            dispatch(setLoading(true))
            const response = await apiConnector("PUT", profileEndpoints.REMOVE_DISPLAY_PICTURE_API)
            console.log(response)
            updateUserDetailsInLocalStorage()
            dispatch(setLoading(false))
            dispatch(setRemoveDpModal(false))
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            console.log("error in removing dp from front end")
            toast.error(error.data.message)
        }
    }
    return removeDisplayPicture
}

//update profile information
export const useUpdateProfileInformationHook = () => {
    const updateProfileInformation = async (formData) => {

        //this will ensure that the form data is not empty , atleast one entry must be there
        const hasNonEmptyEntry = Object.values(formData).some((value) => value.trim() !== "")

        if (!hasNonEmptyEntry) {
            toast.error("Update atleast one field.");
            return;
        }

        try {
            const response = await apiConnector("PUT", profileEndpoints.UPDATE_PROFILE_DETAILS_API, formData)
            toast.success(response.data.message)
            updateUserDetailsInLocalStorage()
            console.log("profile info updated")
            console.log("update profile info response: ", response)
        } catch (error) {
            console.log(error)
            console.log("cant update profile info")
            toast.error(error.data.message)
        }
    }
    return updateProfileInformation
}

//update password
export const useUpdatePasswordHook = () => {
    const dispatch = useDispatch()
    const updatePassword = async (formData) => {
        try {
            dispatch(setLoading(true))
            const response = await apiConnector("PUT", profileEndpoints.UPDATE_PASSWORD_API, formData)
            dispatch(setLoading(false))
            dispatch(setUpdatePasswordModal(false))
            toast.success(response.data.message)
            dispatch(setUpdatePasswordInformation(null))
            console.log("password updated successfully")
            console.log("update password response: ", response)
        } catch (error) {
            dispatch(setLoading(false))
            dispatch(setUpdatePasswordModal(false))
            toast.error(error.response.data.message)
            console.log(error)
            console.log("cant update password")
        }
    }
    return updatePassword
}

//delete account
export const useDeleteAccountHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteAccount = async () => {
        try {
            dispatch(setLoading(true))
            const response = await apiConnector("DELETE", profileEndpoints.DELETE_ACCOUNT_API)
            // console.log("account deleted successfully")
            // console.log("account deletion response: ",response)
            dispatch(setDeleteAccountModal(false))
            navigate("/")
            dispatch(setToken(null))
            dispatch(setUser(null))
            localStorage.removeItem("User")
            localStorage.removeItem("Token")
            dispatch(setLoading(false))
            toast.success("Account Deleted !")
        } catch (error) {
            dispatch(setLoading(false))
            console.log(error)
            console.log("cant delete account")
        }
    }
    return deleteAccount
}

//get user enrolled courses
export const useGetEnrolledCourses = () => {
    const dispatch = useDispatch()
    const getEnrolledCourses = async () => {
        try {
            const response = await apiConnector("GET", courseEndpoints.GET_USER_ENROLLED_COURSES)
            // console.log("user enrolled courses fetched successfully")
            // console.log("user enrolled courses response: ", response)
            localStorage.setItem("enrolledCourses", JSON.stringify(response?.data?.data))
            dispatch(setEnrolledCourses(response?.data?.data))
        } catch (error) {
            console.log(error)
            // console.log("cant fetch user enrolled courses")
            dispatch(setEnrolledCourses(null))
            return
        }
    }
    return getEnrolledCourses
}

//get instructor courses
export const useGetInstructorCoursesHook = () => {
    const dispatch = useDispatch()
    const getInstructorCourses = async () => {
        try {
            const response = await apiConnector("GET", courseEndpoints.GET_INSTRUCTOR_COURSES_API)
            // console.log("instructor courses fetched successfully")
            // console.log("instructor courses response: ",response)
            dispatch(setInstructorCourses(response.data.data))
        } catch (error) {
            console.log(error)
            console.log("cant fetch instructor courses successfully")
        }
    }
    return getInstructorCourses
}

//create new course information api
export const useCreateNewCourseInformation = () => {
    const dispatch = useDispatch();

    const createNewCourseInformation = async (formData) => {
        const data = new FormData();
        data.append("courseName", formData.courseName);
        data.append("courseDescription", formData.courseDescription);
        data.append("thumbnail", formData.thumbnail);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("tag", formData.tag);
        data.append("whatWillYouLearn", formData.whatWillYouLearn);

        const toastId = toast.loading("Creating course...");

        try {
            const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_INFORMATION_API, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            dispatch(setStep(2));
            dispatch(setCourse(response.data.data));

            // Update toast to success
            toast.success("Course created successfully!", { id: toastId });
        } catch (error) {
            dispatch(setCourse(null));
            dispatch(setStep(1));
            console.error(error);

            // Update toast to error
            toast.error("Failed to create course. Please try again.", { id: toastId });
        }
    };

    return createNewCourseInformation;
};

//create new course section
export const useCreateSection = () => {
    const dispatch = useDispatch()
    const createSection = async (data) => {
        try {
            const response = await apiConnector("POST", courseEndpoints.CREATE_NEW_SECTION_API, data)
            // console.log("section created successfully")
            console.log("new section api response: ", response)
            dispatch(setCourse(response.data.data))
            toast.success(response.data.message)
        } catch (error) {
            dispatch(setCourse(null))
            dispatch(setStep(1))
            console.log(error)
            // console.log("cannot create new section")
            toast.error(error.data.message)
        }
    }
    return createSection
}

//create new sub section
export const useCreateSubSection = () => {
    const dispatch = useDispatch()
    const createSubSection = async (data) => {

        const formData = new FormData()
        formData.append("sectionId", data.sectionId)
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("videoFile", data.videoFile)

        const toastId = toast.loading("Creating Lecture...")

        try {
            const response = await apiConnector("POST", courseEndpoints.CREATE_NEW_SUBSECTION_API, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            // console.log("sub section is created successfully")
            console.log("sub section api response: ", response)
            dispatch(setCourse(response.data.data))
            toast.success(response.data.message, { id: toastId })

        } catch (error) {
            console.log(error)
            // console.log("cant create sub section")
            toast.error(error.data.message, { id: toastId })
        }
    }
    return createSubSection
}

//update section name
export const useUpdateSection = () => {
    const dispatch = useDispatch()
    const updateSection = async (data) => {
        try {
            const response = await apiConnector("PUT", courseEndpoints.UPDATE_SECTION_API, data)
            // console.log("section updated successfully")
            // console.log("update section response: ", response)
            dispatch(setCourse(response.data.data))
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            // console.log("cant update section")
            toast.error(error.data.message)
        }
    }
    return updateSection
}

//delete section 
export const useDeleteSection = () => {
    const dispatch = useDispatch()
    const deleteSection = async (sectionId) => {
        try {
            const response = await apiConnector("DELETE", courseEndpoints.DELETE_SECTION_API, { sectionId })
            // console.log("section deleted successfully")
            // console.log("delete section api response: ", response)
            dispatch(setCourse(response.data.data))
        } catch (error) {
            console.log(error)
            // console.log("cant delete section")
        }
    }
    return deleteSection
}

//delete sub section
export const useDeleteSubSection = () => {
    const dispatch = useDispatch()
    const deleteSubSection = async (subSectionId) => {
        try {
            const response = await apiConnector("DELETE", courseEndpoints.DELETE_SUBSECTION_API, { subSectionId })
            // console.log("sub section deleted successfully")
            // console.log("delete sub section api response: ", response)
            dispatch(setCourse(response.data.data))
        } catch (error) {
            console.log(error)
            // console.log("cant delete sub section")
        }
    }
    return deleteSubSection
}

//update sub section 
export const useUpdateSubSection = () => {

    const dispatch = useDispatch()

    const updateSubSection = async (data) => {

        const formData = new FormData()

        if (data?.subSectionId) formData.append("subSectionId", data.subSectionId);
        if (data?.title) formData.append("title", data.title);
        if (data?.description) formData.append("description", data.description);
        if (data?.videoFile) formData.append("videoFile", data.videoFile);

        try {
            const response = await apiConnector("PUT", courseEndpoints.UPDATE_SUBSECTION_API, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            // console.log("sub section is updated successfully")
            // console.log("sub section updation api response: ", response)
            dispatch(setCourse(response.data.data))
            toast.success(response.data.message)

        } catch (error) {
            console.log(error)
            // console.log("cant update sub section")
            console.log(error.data.message)
        }
    }
    return updateSubSection
}

//publish course
export const useSetCourseStatus = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const setCourseStatus = async (courseId, status) => {
        try {
            const response = await apiConnector("PUT", courseEndpoints.SET_COURSE_STATUS_API, { courseId, status })
            // console.log("course status is set successfully")
            // console.log("set course status api response: ", response)
            toast.success(response.data.message)
            dispatch(setCourse(null))
            dispatch(setStep(1))
            navigate("/profile/instructor-courses")
        } catch (error) {
            console.log(error)
            // console.log("cant publish course")
            toast.error(error.data.message)
            dispatch(setCourse(null))
            dispatch(setStep(1))
        }
    }
    return setCourseStatus
}

//delete course
export const useDeleteCourse = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteCourse = async (courseId) => {
        const toastId = toast.loading("Deleting course...")
        try {
            const response = await apiConnector("DELETE", courseEndpoints.DELETE_COURSE_API, { courseId })
            // console.log("course deleted successfully")
            // console.log("course deletion api response: ",response)
            toast.success(response?.data?.message, { id: toastId })
            dispatch(setEditCourse(false))
            dispatch(setCourse(null))
            navigate("/profile/instructor-courses")
        } catch (error) {
            toast.error(error.data.message, { id: toastId })
            console.log(error)
            // console.log("cant delete course")
            toast.error(error.data.message)
            dispatch(setCourse(null))
        }
    }
    return deleteCourse
}

//get all courses
export const useGetAllCourses = () => {
    const getAllCourses = async () => {
        try {
            const response = await apiConnector("GET", courseEndpoints.GET_ALL_COURSES_API)
            // console.log("all courses are fetched successfully")
            // console.log("get all courses api response : ", response)
            return response
        } catch (error) {
            console.log(error)
            // console.log("cant fetch all the courses")
        }
    }
    return getAllCourses
}

//get course details
export const useGetCourseDetails = () => {
    const dispatch = useDispatch()
    const getCourseDetails = async (courseId) => {
        try {
            const response = await apiConnector("POST", courseEndpoints.GET_COURSE_DETAILS_API, { courseId })
            // console.log("course details are fetched successfully")
            // console.log("course details api response: ", response)
            localStorage.setItem("courseDetails", JSON.stringify(response.data.data))
            dispatch(setCourseDetails(response?.data?.data))
        } catch (error) {
            console.log(error)
            // console.log("cant fetch course details")
        }
    }
    return getCourseDetails
}

//buy course
//load script function needed to initiate the order
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

//initiate the order
export async function buyCourse(courses, userDetails,token) {
    const toastId = toast.loading("Loading...");
    try {
        //load the script
        const scriptResponse = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!scriptResponse) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", paymentEndpoints.CAPTURE_PAYMENT_API, { courses })
        console.log("PRINTING orderResponse", orderResponse);
        // options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {

                //verifyPayment
                verifyPayment({ ...response, courses }, token);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

//verify payment
const verifyPayment = async (bodyData) => {
    const toastId = toast.loading("Verifying Payment....");
    try {
        const response = await apiConnector("POST", paymentEndpoints.VERIFY_PAYMENT_API, bodyData)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("payment Successful, Course Added", { id: toastId });
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment", { id: toastId });
    }
}
