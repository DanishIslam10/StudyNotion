import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, profileEndpoints, resetPassword, resetPasswordUrl, sendOTP, signUpEndPoint, userEndPoints } from "../apis"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setSignUpData, setToken } from "../../slices/authSlice"
import { useNavigate } from "react-router"
import { setUser } from "../../slices/profileSlice"

export const useGetAllCategoriesHook = () => {
    const getAllCategories = async () => {
        try {
            const result = await apiConnector("GET", courseEndpoints.CATEGORIES_API)
            console.log("Categories fetched successfully")
            return result;
        } catch (error) {
            console.log(error)
            console.log("could not fetch categories")
        }
    }
    return getAllCategories
}

export const useSendSignUpOtpHook = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sendSignUpOtp = async (signUpFormData) => {

        //validate password and confirm password
        if(signUpFormData.password !== signUpFormData.confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        //validate email id
        const {email} = signUpFormData
        const validateEmailFormat = () => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
          };
        if(!validateEmailFormat) {
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
            console.log("cant send otp from front end, ye raha error: ",error)
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
            const response = await apiConnector("POST", userEndPoints.LOGIN_API,formData)
            // console.log("Log in response: ",response)
            // store the values in redux store
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            //store the values in browser's local storage
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
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
     localStorage.removeItem("token")
     localStorage.removeItem("user")
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

    const resetYourPassword = async ({newPassword, confirmNewPassword, token}) => {
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
    const { signUpData } = useSelector((state) => state.auth)
    console.log("Sign Up Data of redux inside operation before: ", signUpData)

    const signUp = async (data) => {
        try {
            dispatch(setLoading(true))
            await apiConnector("POST", userEndPoints.SIGNUP_API, data)
            dispatch(setLoading(false))
            toast.success("Account Created Successfully")
            console.log("Account created successfully")
            navigate("/login")
            console.log("Sign Up Data of redux inside operations after: ", signUpData)

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
            await apiConnector("GET",profileEndpoints.GET_USER_DEATILS_API)
            console.log("user profile details fetched successfully")
        } catch (error) {
            console.log(error)
            console.log("cant fetch user profile details")
        }
    }
    return getUserDetails
}