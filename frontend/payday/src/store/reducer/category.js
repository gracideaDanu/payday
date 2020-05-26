export const fetchCategoriesStart = (state, action) => {
    const newState = {
        ...state,
        categories: {
            ...state.categories,
            loading: true
        }
    }
    return (newState);
};

export const fetchCategoriesSuccess = (state, action) => {
    return ({
        ...state,
        categories: {
            ...state.categories,
            loading: false,
            categories: action.categories,
        }
    })
};

export const fetchCategoriesFailed = (state, action) => {
    return ({
        ...state,
        categories: {
            ...state.categories,
            error: action.error,
            loading: false
        }
    })
};