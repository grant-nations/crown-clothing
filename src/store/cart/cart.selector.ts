import {createSelector} from "reselect";
import {CartItem} from "./cart.types";
import {CartState} from "./cart.reducer";

const selectCartReducer = (state) : CartState => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    cart => cart.cartItems
)

export const selectCartOpen = createSelector(
    [selectCartReducer],
    cart => cart.cartOpen
)

export const selectCartQuantity = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
)
