import * as api from '../../api/api';
import {
    INTEREST_RATE_SALE_REQUEST, 
    INTEREST_RATE_SALE_SUCCESS, 
    INTEREST_RATE_SALE_FAILED
} from './actionTypes';

export const getListInterestRateSale = fetchData => async (dispatch) => {
    dispatch({
        type: INTEREST_RATE_SALE_REQUEST,
    })
    try {
        const res = await api.getListInterestRateSale();
        if (res && !res.error) {
            return dispatch({
                type: INTEREST_RATE_SALE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INTEREST_RATE_SALE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INTEREST_RATE_SALE_FAILED,
            message: er,
        })
    }
}