import CategoryPreview from "../../components/category-preview/category-preview.component";
import {OuterWrapper, InnerWrapper} from "../../App.styles";
import {useSelector} from "react-redux";
import {selectCategoriesMap, selectCategoriesIsLoading} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <OuterWrapper>
            <InnerWrapper>
                {isLoading ?
                    <Spinner/> :
                    Object.keys(categoriesMap).map((title) => {
                        const products = categoriesMap[title]
                        return <CategoryPreview key={title} title={title} products={products}/>
                    })}
            </InnerWrapper>
        </OuterWrapper>)
}

export default CategoriesPreview;
