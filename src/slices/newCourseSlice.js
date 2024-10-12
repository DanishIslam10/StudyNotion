import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseInformation : null,
}

const newCourseSlice = createSlice({
    name:"newCourse",
    initialState,
    reducers:{
        setCourseInformation(state,action) {
            state.courseInformation = action.payload
        }
    }
})

export const {setCourseInformation} = newCourseSlice.actions 
export default newCourseSlice.reducer