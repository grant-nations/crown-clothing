import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        }

        getCategories().catch(err => console.error(err));
    }, [])

    return (
        <Routes>
            <Route path="/" element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    )
}

export default Shop;
