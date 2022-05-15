import {CategoryPreviewContainer, TitleSpan, PreviewDiv} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import {Link} from "react-router-dom";

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link to={`${title}`}>
                <TitleSpan>{title.toUpperCase()}</TitleSpan>
                </Link>
            </h2>
            <PreviewDiv>
                {products.filter((_, index) => index < 4).map(product =>
                <ProductCard key={product.id} product={product}/>)}
            </PreviewDiv>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;
