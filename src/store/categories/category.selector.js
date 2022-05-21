import {createSelector} from "reselect";

const selectCategoryReducer = (state) => {
    return state.categories};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categories) => categories.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    categories => categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    categories => categories.isLoading
)