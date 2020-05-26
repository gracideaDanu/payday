import * as actionTypes from './actionTypes';
import axios from '../axios';
import { tokenIsInvalid } from './auth';


export const fetchCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories
    };
};

export const fetchCategoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL,
        error: error
    };
};

export const fetchCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_START
    };
};

export const fetchCategories = (token) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(fetchCategoriesStart());
        const config = {
            'headers': {
                'Authentication': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        const url = '/api/categories'
        axios.get(url, config)
            .then(res => {
                const fetchedCategories = [];
                for (let key in res.data.categories) {
                    fetchedCategories.push({
                        ...res.data.categories[key],
                        id: key
                    });
                }

                dispatch(fetchCategoriesSuccess(fetchedCategories));
                resolve(res)
            })
            .catch(err => {
                dispatch(fetchCategoriesFail(err));
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
                reject(err)
            });
    });
};