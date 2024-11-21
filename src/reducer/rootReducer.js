import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import instructorCoursesReducer from "../slices/instructorCourses"
import newCourseReducer from "../slices/newCourseSlice"
import catalogReducer from "../slices/catalogSlice"
import enrolledCoursesReducer from "../slices/enrolledCourses"

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        // Reset the state to undefined to trigger initial states of slices
        state = undefined;
    }
    return combineReducers({
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
        instructorCourses: instructorCoursesReducer,
        newCourse: newCourseReducer,
        catalog: catalogReducer,
        enrolledCourses: enrolledCoursesReducer,
    })(state, action);
};

export default rootReducer;