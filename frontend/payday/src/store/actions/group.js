import * as actionTypes from './actionTypes';
import axios from '../axios';


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
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        axios.get('/api/groups', config)
            .then(res => {
                const fetchedGroups = [];
                for (let key in res.data) {
                    fetchedGroups.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchGroupsSuccess(fetchedGroups));
            })
            .catch(err => {
                dispatch(fetchGroupsFail(err));
            });
    };
};

