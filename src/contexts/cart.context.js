import {createContext, useEffect, useState} from "react";

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

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    cartQuantity: 0,
    removeItemFromCart: () => {
    },
    clearItemFromCart: () => {
    },
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    }

    useEffect(() => {
        // any time the cartItems array changes, recalculate the cart count
        const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartQuantity(newCartQuantity);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

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
