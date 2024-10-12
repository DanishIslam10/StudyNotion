import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, instructorEndpoints, profileEndpoints, resetPassword, resetPasswordUrl, sendOTP, signUpEndPoint, userEndPoints } from "../apis"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setSignUpData, setToken } from "../../slices/authSlice"
import { useNavigate } from "react-router"
import { setDeleteAccountModal, setDpModal, setRemoveDpModal, setUser } from "../../slices/profileSlice"
import { FaBedPulse } from "react-icons/fa6"
import { setInstructorCourses } from "../../slices/instructorCourses"

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
            console.log("Log in response: ", response)
            // store the values in redux store
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            //store the values in browser's local storage
            localStorage.setItem("Token", JSON.stringify(response.data.token))
            localStorage.setItem("User", JSON.stringify(response.data.user))
            console.log("Login Successfull")
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
        localStorage.removeItem("Token")
        localStorage.removeItem("User")
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
    const updatePassword = async (formData) => {
        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("Passwords do not match")
            return;
        }
        try {
            const response = await apiConnector("PUT", profileEndpoints.UPDATE_PASSWORD_API, formData)
            toast.success(response.data.message)
            console.log("password updated successfully")
            console.log("update password response: ", response)
        } catch (error) {
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
export const getEnrolledCourses = async () => {
    try {
        const response = await apiConnector("GET",courseEndpoints.GET_USER_ENROLLED_COURSES)
        console.log("user enrolled courses fetched successfully")
        console.log("user enrolled courses response: ",response)
        return response
    } catch (error) {
        console.log(error)
        console.log("cant fetch user enrolled courses")
        return error
    }
}

//get instructor courses
export const useGetInstructorCoursesHook = () => {
    const dispatch = useDispatch()
    const getInstructorCourses = async () => {
        try {
            const response = await apiConnector("GET",courseEndpoints.GET_INSTRUCTOR_COURSES_API)
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