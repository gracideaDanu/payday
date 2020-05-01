import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer/reducer';
import throttle from 'lodash.throttle';
import thunk from 'redux-thunk';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        console.log(JSON.parse(serializedState));
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

//Init persistedState
const persistedState = loadState();


const store = createStore(reducer,
    persistedState,
    compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f));



store.subscribe(throttle(() => {
    saveState({
        groups: store.getState().groups,
        users: store.getState().users,
        expenses: store.getState().expenses,
        auth: {
            ...store.getState().auth,
            token: store.getState().auth.token
        }
    });
}, 1000));

export default store; 
