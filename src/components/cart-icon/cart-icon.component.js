import {ShoppingIcon, CartIconContainer, ItemCount} from "./cart-icon.styles";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CartIcon = ({onClick}) => {

    const {cartQuantity} = useContext(CartContext);

    return (
        <CartIconContainer onClick={onClick} >
            <ShoppingIcon/>
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
