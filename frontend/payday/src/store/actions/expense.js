import * as actionTypes from './actionTypes';
import axios from '../axios';
import { tokenIsInvalid } from './auth';


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
                'Authentication': token,
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


export const postExpenseSuccess = () => {
    return {
        type: actionTypes.POST_EXPENSE_SUCCESS
    };
};

export const postExpenseFail = (error) => {
    return {
        type: actionTypes.POST_EXPENSE_FAIL,
        error: error
    };
};

export const postExpenseStart = () => {
    return {
        type: actionTypes.POST_EXPENSE_START
    };
};

export const postExpense = (token, expenseData) => {
    return dispatch => {
        dispatch(postExpenseStart());
        const config = {
            'headers': {
                'Authentication': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        console.log(expenseData)
        const url = '/api/expense'
        console.log(config)
        const data = expenseData
        axios.post(url, data, config)
            .then(res => {
                console.log("Expense posted")
                dispatch(postExpenseSuccess());
            })
            .catch(err => {
                dispatch(postExpenseFail(err));
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
