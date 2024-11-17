import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPublishedCourses : null,
    courseDetails : localStorage.getItem("courseDetails") ? JSON.parse(localStorage.getItem("courseDetails")) : null,
    alReadyEnrolled : false,
    detailLoading:false,
}

const catalogSlice = createSlice({
    name:"catalog",
    initialState,
    reducers:{
        setAllPublishedCourses(state,action) {
            state.allPublishedCourses = action.payload
        },
        setCourseDetails(state,action) {
            state.courseDetails = action.payload
        },
        setAlreadyEnrolled(state,action) {
            state.alReadyEnrolled = action.payload
        },
        setDetailLoading(state,action) {
            state.detailLoading = action.payload
        }
    }
})

export const {setAllPublishedCourses,setCourseDetails,setAlreadyEnrolled,setDetailLoading} = catalogSlice.actions
export default catalogSlice.reducer