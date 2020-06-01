export const fetchGroupsStart = (state, action) => {
    const newState = {
        ...state,
        groups: {
            ...state.groups,
            loading: true
        }
    }
    return (newState);
};

export const fetchGroupsSuccess = (state, action) => {
    return ({
        ...state,
        groups: {
            ...state.groups,
            loading: false,
            error: action.error,
            groups: action.groups
        }
    })
};

export const fetchGroupsFailed = (state, action) => {
    return ({
        ...state,
        groups: {
            ...state.groups,
            loading: false
        }
    })
};


export const postGroupStart = (state, action) => {
    const newState = {
        ...state
    }
    return (newState);
};

export const postGroupSuccess = (state, action) => {
    return ({
        ...state
    })
};

export const postGroupFailed = (state, action) => {
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

export const deleteGroupStart = (state, action) => {
    return ({
        ...state
    })
};

export const deleteGroupSuccess = (state, action) => {
    return ({
        ...state
    })
};

export const deleteGroupFailed = (state, action) => {
    return ({
        ...state
    })
};