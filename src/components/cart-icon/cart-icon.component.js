import {ShoppingIcon, CartIconContainer, ItemCount} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartQuantity} from "../../store/cart/cart.selector";
import {setCartOpen} from "../../store/cart/cart.action";

const CartIcon = () => {

    const dispatch = useDispatch();
    const toggleCartOpen = () => dispatch(setCartOpen())
    const cartQuantity = useSelector(selectCartQuantity);

    return (
        <CartIconContainer onClick={toggleCartOpen} >
            <ShoppingIcon/>
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
