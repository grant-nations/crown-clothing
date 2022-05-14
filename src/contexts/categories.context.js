import {createContext, useState, useEffect} from "react";

import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    useEffect(() => {
        const getCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategories().catch(err => console.error(err));
    }, [])

    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
