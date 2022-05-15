import {
    CheckoutItemContainer,
    ImageContainer,
    ArrowDiv,
    ValueSpan,
    QuantitySpan,
    RemoveButton
} from "./checkout-item.styles";
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);

    const clearCartItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

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
}

export default CheckoutItem;
