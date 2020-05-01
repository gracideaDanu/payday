import * as actionTypes from './actionTypes';
import axios from '../axios';


export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    };
};

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    };
};

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsers = (token) => {
    return dispatch => {
        dispatch(fetchUsersStart());
        const config = {
            'headers': {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        axios.get('/api/users', config)
            .then(res => {
                const fetchedUsers = [];
                for (let key in res.data) {
                    fetchedUsers.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchUsersSuccess(fetchedUsers));
            })
            .catch(err => {
                dispatch(fetchUsersFail(err));
            });
    };
};

