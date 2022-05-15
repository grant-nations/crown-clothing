import {CartItemContainer, ItemDetails, NameSpan} from "./cart-item.styles";

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name}/>
            <ItemDetails>
                <NameSpan>{name}</NameSpan>
                <span className={price}>{quantity} x {price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;
