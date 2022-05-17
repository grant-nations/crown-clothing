import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils";

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

const INITIAL_STATE = {
    cartOpen: false,
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_CART_OPEN: "SET_CART_OPEN"
}

export const CartContext = createContext({
    cartOpen: INITIAL_STATE.cartOpen,
    setCartOpen: () => {
    },
    cartItems: INITIAL_STATE.cartItems,
    addItemToCart: () => {
    },
    cartQuantity: INITIAL_STATE.cartQuantity,
    removeItemFromCart: () => {
    },
    clearItemFromCart: () => {
    },
    cartTotal: INITIAL_STATE.cartTotal
});


export const CartProvider = ({children}) => {

    // reducers should not perform any state computations but just be used to set state.
    const cartReducer = (state, action) => {
        const {type, payload} = action;

        switch (type) {
            case CART_ACTION_TYPES.SET_CART_ITEMS:
                return {
                    ...state,
                    ...payload
                }
            case CART_ACTION_TYPES.SET_CART_OPEN:
                return {
                    ...state,
                    cartOpen: !state.cartOpen
                }
            default:
                throw new Error(`Unhandled type of ${type} in cartReducer`);
        }
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItems(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItems(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItems(newCartItems);
    }

    const setCartOpen = () => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN));
    }

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartOpen, cartItems, cartQuantity, cartTotal} = state;

    const updateCartItems = (newCartItems) => {
        // this is a function that receives new cart items. It then updates the cart total and cart count.
        // Finally, it dispatches the SET_CART_ITEMS action in cartReducer

        // generate new cart total
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

        // generate new cart quantity
        const newCartQuantity = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartQuantity: newCartQuantity
            })
        )
    }

    const value = {
        cartOpen,
        setCartOpen,
        cartItems,
        addItemToCart,
        cartQuantity,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
