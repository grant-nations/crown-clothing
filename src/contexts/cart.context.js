import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    } else{
        return [...cartItems, {...productToAdd, quantity: 1}];
    }
}

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    cartQuantity: 0,
    setCartQuantity: () => {
    }
});

export const CartProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    useEffect(() => {
        // any time the cartItems array changes, recalculate the cart count
        const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartQuantity(newCartQuantity);
    }, [cartItems])

    const value = {cartOpen, setCartOpen, cartItems, addItemToCart, cartQuantity, setCartQuantity};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
