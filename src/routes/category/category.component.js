import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from "./category.styles";
import {OuterWrapper, InnerWrapper} from "../../App.styles";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <OuterWrapper>
            <InnerWrapper>
                <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
                {isLoading ?
                    <Spinner/> :
                    <CategoryContainer>
                    {products && products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </CategoryContainer>}

            </InnerWrapper>
        </OuterWrapper>)
}

export default Category;
