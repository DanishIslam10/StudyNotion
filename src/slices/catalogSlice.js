import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPublishedCourses: [],
    courseDetails: localStorage.getItem("courseDetails")
        ? JSON.parse(localStorage.getItem("courseDetails"))
        : null,

    alReadyEnrolled: false,

    detailLoading: false,

    catalogLoading: false,
};

const catalogSlice = createSlice({
    name: "catalog",
    initialState,

    reducers: {
        setAllPublishedCourses(state, action) {
            state.allPublishedCourses = action.payload;
        },

        setCourseDetails(state, action) {
            state.courseDetails = action.payload;
        },

        setAlreadyEnrolled(state, action) {
            state.alReadyEnrolled = action.payload;
        },

        setDetailLoading(state, action) {
            state.detailLoading = action.payload;
        },

        setCatalogLoading(state, action) {
            state.catalogLoading = action.payload;
        },
    },
});

export const {
    setAllPublishedCourses,
    setCourseDetails,
    setAlreadyEnrolled,
    setDetailLoading,
    setCatalogLoading,
} = catalogSlice.actions;

export default catalogSlice.reducer;