import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    enrolledCourses:null,
}

const enrolledCoursesSlice = createSlice({
    name:"enrolledCourses",
    initialState,
    reducers:{
        setEnrolledCourses(state,action) {
            state.enrolledCourses = action.payload
        }
    }
})

export const {setEnrolledCourses} = enrolledCoursesSlice.actions
export default enrolledCoursesSlice.reducer