import * as actionTypes from './actionTypes';
import axios from '../axios';


export const fetchExpensesSuccess = (expenses, groupID) => {
    return {
        type: actionTypes.FETCH_EXPENSES_SUCCESS,
        expenses: expenses,
        selectedGroup: groupID
    };
};

export const fetchExpensesFail = (error) => {
    return {
        type: actionTypes.FETCH_EXPENSES_FAIL,
        error: error
    };
};

export const fetchExpensesStart = () => {
    return {
        type: actionTypes.FETCH_EXPENSES_START
    };
};

export const fetchExpenses = (token, groupID) => {
    return dispatch => {
        dispatch(fetchExpensesStart());
        const config = {
            'headers': {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        console.log(groupID)
        const url = '/api/expenses/' + groupID
        console.log(config)
        axios.get(url, config)
            .then(res => {
                const fetchedExpenses = [];
                for (let key in res.data) {
                    fetchedExpenses.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchExpensesSuccess(fetchedExpenses, groupID));
            })
            .catch(err => {
                dispatch(fetchExpensesFail(err));
            });
    };
};

