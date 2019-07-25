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
import interestRate from './interestRate';
import bondPrice from './bondPrice';
import roomVCSC from './roomVCSC';
import setCommand from './setCommand';
import bankInterest from './bankInterest';
import investor from './investor';
import listAssets from './listAssets';
import interestRateSale from './interestRateSale';
import feeTrade from './feeTrade';
import interestReturn from './interestReturn';
import listBondsInterestReturn from './listBondsInterestReturn';

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
    bondType: bondType,
    interestRate: interestRate,
    bondPrice: bondPrice,
    roomVCSC: roomVCSC,
    setCommand: setCommand,
    bankInterest: bankInterest,
    investor: investor,
    listAssets: listAssets,
    interestRateSale: interestRateSale,
    feeTrade: feeTrade,
    interestReturn: interestReturn,
    listBondsInterestReturn: listBondsInterestReturn
});