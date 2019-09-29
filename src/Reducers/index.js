import {combineReducers} from 'redux';

import ReducerOne from './ReducerOne';


/** Reducers index file **/
const appReducer = combineReducers({
    ReducerOne,

});

export default (state, action) => {
    return appReducer(state, action);
}