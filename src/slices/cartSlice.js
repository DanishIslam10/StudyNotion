import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, action) {
            state.totalItems = action.payload
        },
        //add to cart
        addToCart(state, action) {
           state.totalItems += 1
           localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        },
        //remove from cart
        removeFromCart(state,action) {
            if(state.totalItems > 0) {
               state.totalItems -= 1
            }
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        },
        //reset cart
        resetCart(state,action) {
            state.totalItems = 0
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        }
    }
})

export const { setTotalItems,addToCart,removeFromCart,resetCart } = cartSlice.actions
export default cartSlice.reducer