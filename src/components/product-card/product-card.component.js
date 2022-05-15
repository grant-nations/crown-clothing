import {PriceSpan, NameSpan, Footer, ProductCardContainer} from "./product-card.styles";
import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";

const ProductCard = ({product}) => {

    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    const {name, imageUrl, price} = product;
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <NameSpan>{name}</NameSpan>
                <PriceSpan>${price}</PriceSpan>
            </Footer>
            <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;
