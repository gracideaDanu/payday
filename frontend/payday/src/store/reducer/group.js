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
    console.log(action.groups);
    return ({
        ...state,
        groups: {
            ...state.groups,
            loading: false,
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
