import {CartItemContainer, ItemDetails, NameSpan} from "./cart-item.styles";
import {CartItem as CI} from "../../store/cart/cart.types";

type CartItemProps = {
    cartItem: CI;
}

const CartItem = ({cartItem} : CartItemProps) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name}/>
            <ItemDetails>
                <NameSpan>{name}</NameSpan>
                <span>{quantity} x {price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;
