import {useContext, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {CategoriesContext} from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from "./category.styles";
import {OuterWrapper, InnerWrapper} from "../../App.styles";

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <OuterWrapper>
            <InnerWrapper>
                <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
                <CategoryContainer>
                    {/*if products is undefined, don't render it*/}
                    {products && products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </CategoryContainer>
            </InnerWrapper>
        </OuterWrapper>)
}

export default Category;
