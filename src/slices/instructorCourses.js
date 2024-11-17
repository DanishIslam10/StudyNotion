import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    instructorCourses: [],
    instructorCoursesLoading:false,
}

const instructorCoursesSlice = createSlice({
    name: "instructorCourses",
    initialState,
    reducers: {
        setInstructorCourses(state, action) {
            state.instructorCourses = action.payload
        },
        setInstructorCoursesLoading(state,action) {
            state.instructorCoursesLoading = action.payload
        }
    }
})

export const {setInstructorCourses,setInstructorCoursesLoading} = instructorCoursesSlice.actions
export default instructorCoursesSlice.reducer