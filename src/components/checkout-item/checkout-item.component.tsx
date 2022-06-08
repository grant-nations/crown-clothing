import {
    CheckoutItemContainer,
    ImageContainer,
    ArrowDiv,
    ValueSpan,
    QuantitySpan,
    RemoveButton
} from "./checkout-item.styles";
import {clearItemFromCart, addItemToCart, removeItemFromCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";
import {useDispatch, useSelector} from "react-redux";
import {CartItem} from "../../store/cart/cart.types";
import {memo} from "react";

type CheckoutItemProps = {
    cartItem: CartItem
}

const CheckoutItem = memo(({cartItem} : CheckoutItemProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {name, imageUrl, price, quantity} = cartItem;

    const clearCartItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <span>{name}</span>
            <QuantitySpan>
                <ArrowDiv onClick={removeItemHandler}>&#10094;</ArrowDiv>
                <ValueSpan>{quantity}</ValueSpan>
                <ArrowDiv onClick={addItemHandler}>&#10095;</ArrowDiv>
            </QuantitySpan>
            <span>${price}</span>
            <RemoveButton onClick={clearCartItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
});

export default CheckoutItem;
