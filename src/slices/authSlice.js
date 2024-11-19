import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signUpData: null,
    loading: false,
    token: localStorage.getItem("Token") ? JSON.parse(localStorage.getItem("Token")) : null,
    resendSignUpOtp:false,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setSignUpData(state,action) {
            state.signUpData = action.payload
        },
        setLoading(state,action) {
            state.loading = action.payload
        },
        setToken(state,action) {
            state.token = action.payload
        },
        setResendSignUpOtp(state,action) {
            state.resendSignUpOtp = action.payload
        },
    }
})

export const {setToken,setLoading,setSignUpData,setResendSignUpOtp} = authSlice.actions
export default authSlice.reducer