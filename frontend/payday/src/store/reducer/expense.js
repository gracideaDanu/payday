export const fetchExpensesStart = (state, action) => {
    const newState = {
        ...state,
        expenses: {
            ...state.expenses,
            loading: true
        }
    }
    return (newState);
};

export const fetchExpensesSuccess = (state, action) => {
    return ({
        ...state,
        expenses: {
            ...state.expenses,
            loading: false,
            expenses: action.expenses,
            selectedGroup: action.selectedGroup
        }
    })
};

export const fetchExpensesFailed = (state, action) => {
    return ({
        ...state,
        expenses: {
            ...state.expenses,
            error: action.error,
            loading: false
        }
    })
};

export const postExpenseStart = (state, action) => {
    return ({
        ...state
    })
};

export const postExpenseSuccess = (state, action) => {
    return ({
        ...state
    })
};

export const postExpenseFailed = (state, action) => {
    return ({
        ...state
    })
};

export const deleteExpenseStart = (state, action) => {
    return ({
        ...state
    })
};

export const deleteExpenseSuccess = (state, action) => {
    return ({
        ...state
    })
};

export const deleteExpenseFailed = (state, action) => {
    return ({
        ...state
    })
};