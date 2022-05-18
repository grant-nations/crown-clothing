import CategoryPreview from "../../components/category-preview/category-preview.component";
import {OuterWrapper, InnerWrapper} from "../../App.styles";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <OuterWrapper>
            <InnerWrapper>
                {Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} title={title} products={products}/>
                })}
            </InnerWrapper>
        </OuterWrapper>)
}

export default CategoriesPreview;
