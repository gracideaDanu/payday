export const fetchUsersStart = (state, action) => {
    const newState = {
        ...state,
        users: {
            ...state.users,
            loading: true
        }
    }
    return (newState);
};

export const fetchUsersSuccess = (state, action) => {
    return ({
        ...state,
        users: {
            ...state.users,
            loading: false,
            users: action.users
        }
    })
};

export const fetchUsersFailed = (state, action) => {
    return ({
        ...state,
        users: {
            ...state.users,
            loading: false
        }
    })
};
