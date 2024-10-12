const BASE_URL = process.env.REACT_APP_BASE_URL

export const courseEndpoints = {

    CATEGORIES_API: BASE_URL + "/course/showAllCategories",

    GET_USER_ENROLLED_COURSES: BASE_URL + "/course/getEnrolledCourses",

    GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses"
};

export const userEndPoints = {

    SEND_OTP_API: BASE_URL + "/auth/user/sendotp",

    LOGIN_API: BASE_URL + "/auth/user/login",

    RESET_PASSWORD_URL_API: BASE_URL + "/auth/user/resetPasswordUrl",

    RESET_PASSWORD_API: BASE_URL + "/auth/user/resetPassword",

    SIGNUP_API: BASE_URL + "/auth/user/signup",

}

export const profileEndpoints = {

    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",

    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",

    REMOVE_DISPLAY_PICTURE_API: BASE_URL + "/profile/removeDisplayPicture",

    UPDATE_PROFILE_DETAILS_API: BASE_URL + "/profile/updateProfileDetails",

    UPDATE_PASSWORD_API: BASE_URL + "/profile/changePassword",

    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteAccount"
}

export const contactUsEndPoint = {

    CONTACT_US_API: BASE_URL + "/contactUs"

}
