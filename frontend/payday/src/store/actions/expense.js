import * as actionTypes from './actionTypes';
import axios from '../axios';
import { tokenIsInvalid } from './auth';


export const fetchExpensesSuccess = (expenses, groupId) => {
    return {
        type: actionTypes.FETCH_EXPENSES_SUCCESS,
        expenses: expenses,
        selectedGroup: groupId
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

export const fetchExpenses = (token, groupId) => {
    return dispatch => {
        dispatch(fetchExpensesStart());
        const config = {
            'headers': {
                'Authentication': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        const url = '/api/expenses/' + groupId
        axios.get(url, config)
            .then(res => {
                const fetchedExpenses = [];
                for (let key in res.data.expenses) {
                    fetchedExpenses.push({
                        ...res.data.expenses[key],
                        id: key
                    });
                }

                dispatch(fetchExpensesSuccess(fetchedExpenses, groupId));
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
        const url = '/api/expense'
        const data = expenseData
        axios.post(url, data, config)
            .then(res => {
                dispatch(postExpenseSuccess());
                dispatch(fetchExpenses(token, expenseData.groupId));
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

export const deleteExpenseSuccess = (groups) => {
    return {
        type: actionTypes.DELETE_EXPENSE_SUCCESS,
        groups: groups
    };
};

export const deleteExpenseFail = (error) => {
    return {
        type: actionTypes.DELETE_EXPENSE_FAIL,
        error: error
    };
};

export const deleteExpenseStart = () => {
    return {
        type: actionTypes.DELETE_EXPENSE_START
    };
};

export const deleteExpense = (token, expenseId, groupId) => {
    return dispatch => {
        dispatch(deleteExpenseStart());
        const config = {
            'headers': {
                'authentication': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        console.log(expenseId)
        const url = '/api/expense/' + expenseId
        console.log(config)

        axios.delete(url, config)
            .then(res => {
                console.log("Expense deleted")
                dispatch(deleteExpenseSuccess());
                dispatch(fetchExpenses(token, groupId));
            })
            .catch(err => {
                dispatch(deleteExpenseFail(err));
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
    }
}
