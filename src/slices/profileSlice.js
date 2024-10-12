import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null,
    loading: false,
    logoutModal: false,
    dpModal:false,
    removeDpModal:false,
    deleteAccountModal:false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
       setUser(state,action) {
        state.user = action.payload
       },
       setLogoutModal(state,action) {
        state.logoutModal = action.payload
       },
       setDpModal(state,action) {
        state.dpModal = action.payload
       },
       setRemoveDpModal(state,action) {
        state.removeDpModal = action.payload
       },
       setDeleteAccountModal(state,action) {
        state.deleteAccountModal = action.payload
       },
    }
})

export const {setUser,setLogoutModal,setDpModal,setRemoveDpModal,setDeleteAccountModal} = profileSlice.actions
export default profileSlice.reducer