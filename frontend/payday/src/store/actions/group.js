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

