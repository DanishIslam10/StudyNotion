import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import instructorCoursesReducer from "../slices/instructorCourses"
import newCourseReducer from "../slices/newCourseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    instructorCourses: instructorCoursesReducer,
    newCourse: newCourseReducer
})

export default rootReducer