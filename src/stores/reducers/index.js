import { combineReducers } from 'redux';

import login from './login';
import investorType from './investorType';
import ensureAsset from './ensureAsset';
import prefix from './prefix';
import contractVCSC from './contractVCSC';
import company from './company';
import branchVCSC from './branchVCSC';
import bondsAsset from './bondsAsset';
import dayInterestYear from './dayInterestYear';
import paymentTerm from './paymentTerm';
import bondType from './bondType';

export default combineReducers({
    login: login,
    investorType: investorType,
    ensureAsset: ensureAsset,
    prefix: prefix,
    contractVCSC: contractVCSC,
    company: company,
    branchVCSC: branchVCSC,
    bondsAsset: bondsAsset,
    dayInterestYear: dayInterestYear,
    paymentTerm: paymentTerm,
    bondType: bondType
});