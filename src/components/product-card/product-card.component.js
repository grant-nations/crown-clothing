import {PriceSpan, NameSpan, Footer, ProductCardContainer} from "./product-card.styles";
import Button from "../button/button.component";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {addItemToCart} from "../../store/cart/cart.action";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";

const ProductCard = ({product}) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {name, imageUrl, price} = product;
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <NameSpan>{name}</NameSpan>
                <PriceSpan>${price}</PriceSpan>
            </Footer>
            <Button onClick={() => dispatch(addItemToCart(cartItems, product))} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;
