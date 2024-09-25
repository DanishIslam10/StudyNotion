const BASE_URL = process.env.REACT_APP_BASE_URL

export const courseEndpoints = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
};

export const userEndPoints = {

    SEND_OTP_API: BASE_URL + "/auth/user/sendotp",
    
    LOGIN_API: BASE_URL + "/auth/user/login",
    
    RESET_PASSWORD_URL_API: BASE_URL + "/auth/user/resetPasswordUrl",
    
    RESET_PASSWORD_API: BASE_URL + "/auth/user/resetPassword",
    
    SIGNUP_API: BASE_URL + "/auth/user/signup",

}

export const profileEndpoints = {

    GET_USER_DEATILS_API: BASE_URL + "/profile/getUserDetails"
    
}

export const contactUsEndPoint = {
    CONTACT_US_API: BASE_URL + "/contactUs"
}