import * as actionTypes from './actionTypes';
import axios from '../axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    console.log("1")
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const tokenIsInvalid = () => {
    return {
        type: actionTypes.TOKEN_IS_INVALID
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (isSignUp, data) => {
    return dispatch => {
        dispatch(authStart());
        if (!isSignUp) {
            axios.post('login/', data)
                .then(response => {
                    console.log(response);
                    dispatch(authSuccess(response.data));

                })
                .catch(err => {
                    console.log(err);
                    if (err.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(err.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', err.message);
                    }
                    console.log(err.config);
                    dispatch(authFail(err));
                });
        } else {
            axios.post('signup/', data)
                .then(response => {
                    console.log(response);
                    console.log(response.data.token)

                    dispatch(authSuccess(response.data));
                })
                .catch(err => {
                    console.log(err);
                    if (err.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(err.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', err.message);
                    }
                    console.log(err.config);

                    dispatch(authFail(err));
                });
        }

    };
};