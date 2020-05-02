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
                    dispatch(authFail(err));
                });
        }

    };
};