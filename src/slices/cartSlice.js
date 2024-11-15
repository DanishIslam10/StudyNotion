import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            state.cart.push(action.payload)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter((item) => item._id !== action.payload)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer