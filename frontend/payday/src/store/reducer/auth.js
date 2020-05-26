import { initialState } from './reducer'

export const authStart = (state, action) => {
    return ({
        ...state,
        auth: {
            ...state.auth,
            error: null, loading: true
        }
    });
};

export const authSuccess = (state, action) => {
    console.log(action.authData.token)
    return ({
        ...state,
        auth: {
            ...state.auth,
            token: action.authData.token,
            error: null,
            loading: false
        }
    });
};

export const authFail = (state, action) => {
    return ({
        ...state,
        auth: {
            ...state.auth,
            error: action.error,
            loading: false
        }
    });
};

export const authLogout = (state, action) => {
    return ({
        ...initialState
    });
};

export const tokenIsInvalid = (state, action) => {
    return ({
        ...initialState
    });
};


