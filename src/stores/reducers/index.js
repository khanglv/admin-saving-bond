import { combineReducers } from 'redux';

import login from './login';
import investorType from './investorType';

export default combineReducers({
    login: login,
    investorType: investorType,
});