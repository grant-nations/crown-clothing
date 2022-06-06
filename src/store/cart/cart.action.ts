import {CategoryItem} from "../categories/category.types";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    const cartItem = cartItems.find(item => item.id === productToRemove.id);

    if (cartItem && cartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== productToRemove.id);
    } else {
        return cartItems.map(item =>
            item.id === productToRemove.id
                ? {...item, quantity: item.quantity - 1}
                : item
        );
    }
}

const clearCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    return cartItems.filter(item => item.id !== productToRemove.id);
}

export type SetIsCartOpen = Action<CART_ACTION_TYPES.SET_CART_OPEN>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const addItemToCart = (cartItems : CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems : CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems : CartItem[], productToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return setCartItems(newCartItems);
}

export const setCartOpen = withMatcher((): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_CART_OPEN, undefined);
});


