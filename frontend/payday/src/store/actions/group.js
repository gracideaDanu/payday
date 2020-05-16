import * as actionTypes from './actionTypes';
import axios from '../axios';
import { tokenIsInvalid } from './auth';


export const fetchGroupsSuccess = (groups) => {
    return {
        type: actionTypes.FETCH_GROUPS_SUCCESS,
        groups: groups
    };
};

export const fetchGroupsFail = (error) => {
    return {
        type: actionTypes.FETCH_GROUPS_FAIL,
        error: error
    };
};

export const fetchGroupsStart = () => {
    return {
        type: actionTypes.FETCH_GROUPS_START
    };
};

export const fetchGroups = (token) => {
    return dispatch => {
        dispatch(fetchGroupsStart());
        const config = {
            'headers': {
                'Authentication': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        axios.get('/api/groups', config)
            .then(res => {
                const fetchedGroups = [];
                for (let key in res.data.groups) {
                    fetchedGroups.push({
                        ...res.data.groups[key],
                        id: key
                    });
                }
                dispatch(fetchGroupsSuccess(fetchedGroups));
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchGroupsFail(err));
            });
    };
};

export const postGroupSuccess = (groups) => {
    return {
        type: actionTypes.POST_GROUPS_SUCCESS,
        groups: groups
    };
};

export const postGroupFail = (error) => {
    return {
        type: actionTypes.POST_GROUPS_FAIL,
        error: error
    };
};

export const postGroupStart = () => {
    return {
        type: actionTypes.POST_GROUPS_START
    };
};


export const postGroup = (token, groupData) => {
    return dispatch => {
        dispatch(postGroupStart());
        const config = {
            'headers': {
                'Authentication': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        const data = groupData
        axios.post('/api/group', data, config)
            .then(response => {
                dispatch(postGroupSuccess(response));
                dispatch(fetchGroups(token));
            })
            .catch(err => {
                dispatch(postGroupFail(err));
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    if (err.response.status === 401) {
                        dispatch(tokenIsInvalid());
                    }
                }
            });
    };
};