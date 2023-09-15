import { combineReducers } from 'redux';

import modal from './modal';
import ringReducer from './ringReducer';

const rootReducer = combineReducers({
    modal:modal,
    ringReducer:ringReducer,
});

export default rootReducer;