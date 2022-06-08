import {useCallback} from "react";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../store/cart/cart.selector";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";
import {useDispatch, useSelector} from "react-redux";
import {setCartOpen} from "../../store/cart/cart.action";

const CartDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        dispatch(setCartOpen());
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? cartItems.map(item =>
                    <CartItem cartItem={item} key={item.id}/>
                ) : (
                    <EmptyMessage>Your cart is empty :(</EmptyMessage>
                )}
            </CartItems>
                <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

        </CartDropdownContainer>
    )
}

export default CartDropdown;
