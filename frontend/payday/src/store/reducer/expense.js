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
            loading: false
        }
    })
};

export const postExpenseStart = (state, action) => {
    const newState = {
        ...state
    }
    return (newState);
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
