import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    enrolledCourses:localStorage.getItem("enrolledCourses") ? JSON.parse(localStorage.getItem("enrolledCourses")) : null,
    enrolledCoursesLoading:false
}

const enrolledCoursesSlice = createSlice({
    name:"enrolledCourses",
    initialState,
    reducers:{
        setEnrolledCourses(state,action) {
            state.enrolledCourses = action.payload
        },
        setEnrolledCoursesLoading(state,action) {
            state.enrolledCoursesLoading = action.payload
        }
    }
})

export const {setEnrolledCourses,setEnrolledCoursesLoading} = enrolledCoursesSlice.actions
export default enrolledCoursesSlice.reducer