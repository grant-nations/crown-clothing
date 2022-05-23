import {CART_ACTION_TYPES} from "./cart.types";
import {createAction} from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}];
    }
}

const removeCartItem = (cartItems, productToRemove) => {
    const cartItem = cartItems.find(item => item.id === productToRemove.id);

    if (cartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== productToRemove.id);
    } else {
        return cartItems.map(item =>
            item.id === productToRemove.id
                ? {...item, quantity: item.quantity - 1}
                : item
        );
    }
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(item => item.id !== productToRemove.id);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setCartOpen = () => {
    return createAction(CART_ACTION_TYPES.SET_CART_OPEN, undefined);
}


