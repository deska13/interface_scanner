import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { clientReducer } from './client';



const rootReducer = combineReducers({
    clientReducer
})


export const store = createStore(rootReducer, composeWithDevTools())