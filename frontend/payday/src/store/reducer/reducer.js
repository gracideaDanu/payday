import * as actionTypes from '../actions/actionTypes';
import * as groupActions from './group'
import * as authActions from './auth'
import * as expenseActions from './expense'
import * as userActions from './user'
import * as categoryActions from './category'


export const initialState = {
    categories: {
        categories: [],
        loading: false,
        error: null
    },
    expenses: {
        expenses: [],
        selectedGroup: "",
        loading: false,
        error: null
    },
    groups: {
        groups: [],
        loading: false,
        error: null
    },
    users: {
        users: [],
        loading: false,
        error: null
    },
    auth: {
        loading: false,
        token: null,
        // userId: null, //wird vielleicht noch nützlich sein hier noch mehr Informationen zu speichern.
        error: null,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authActions.authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authActions.authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authActions.authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authActions.authLogout(state, action);
        case actionTypes.TOKEN_IS_INVALID: return authActions.tokenIsInvalid(state, action);

        case actionTypes.FETCH_GROUPS_START: return groupActions.fetchGroupsStart(state, action);
        case actionTypes.FETCH_GROUPS_SUCCESS: return groupActions.fetchGroupsSuccess(state, action);
        case actionTypes.FETCH_GROUPS_FAIL: return groupActions.fetchGroupsFailed(state, action);

        case actionTypes.POST_GROUPS_START: return groupActions.postGroupStart(state, action);
        case actionTypes.POST_GROUPS_SUCCESS: return groupActions.postGroupSuccess(state, action);
        case actionTypes.POST_GROUPS_FAIL: return groupActions.postGroupFailed(state, action);

        case actionTypes.FETCH_USERS_START: return userActions.fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return userActions.fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL: return userActions.fetchUsersFailed(state, action);

        case actionTypes.FETCH_EXPENSES_START: return expenseActions.fetchExpensesStart(state, action);
        case actionTypes.FETCH_EXPENSES_SUCCESS: return expenseActions.fetchExpensesSuccess(state, action);
        case actionTypes.FETCH_EXPENSES_FAIL: return expenseActions.fetchExpensesFailed(state, action);

        case actionTypes.FETCH_CATEGORIES_START: return categoryActions.fetchCategoriesStart(state, action);
        case actionTypes.FETCH_CATEGORIES_SUCCESS: return categoryActions.fetchCategoriesSuccess(state, action);
        case actionTypes.FETCH_CATEGORIES_FAIL: return categoryActions.fetchCategoriesFailed(state, action);

        case actionTypes.POST_EXPENSE_START: return expenseActions.postExpenseStart(state, action);
        case actionTypes.POST_EXPENSE_SUCCESS: return expenseActions.postExpenseSuccess(state, action);
        case actionTypes.POST_EXPENSE_FAIL: return expenseActions.postExpenseFailed(state, action);

        case actionTypes.DELETE_EXPENSE_START: return expenseActions.deleteExpenseStart(state, action);
        case actionTypes.DELETE_EXPENSE_SUCCESS: return expenseActions.deleteExpenseSuccess(state, action);
        case actionTypes.DELETE_EXPENSE_FAIL: return expenseActions.deleteExpenseFailed(state, action);

        default:
            return state;
    }
};

export default reducer;