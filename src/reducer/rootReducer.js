import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import instructorCoursesReducer from "../slices/instructorCourses"
import newCourseReducer from "../slices/newCourseSlice"
import catalogReducer from "../slices/catalogSlice"
import enrolledCoursesReducer from "../slices/enrolledCourses"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    instructorCourses: instructorCoursesReducer,
    newCourse: newCourseReducer,
    catalog:catalogReducer,
    enrolledCourses:enrolledCoursesReducer,
})

export default rootReducer