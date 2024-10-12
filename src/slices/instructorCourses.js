import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    instructorCourses: []
}

const instructorCoursesSlice = createSlice({
    name: "instructorCourses",
    initialState,
    reducers: {
        setInstructorCourses(state, action) {
            state.instructorCourses = action.payload
        },
    }
})

export const {setInstructorCourses} = instructorCoursesSlice.actions
export default instructorCoursesSlice.reducer