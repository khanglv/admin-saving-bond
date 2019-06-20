import * as api from '../../api/api';
import {INTEREST_RATE_REQUEST, INTEREST_RATE_SUCCESS, INTEREST_RATE_FAILED} from './actionTypes';

export const getListInvestorType = fetchData => async (dispatch) => {
    dispatch({
        type: INTEREST_RATE_REQUEST,
    })
    try {
        const res = await api.getListInvestorType();
        if (res && !res.error) {
            return dispatch({
                type: INTEREST_RATE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INTEREST_RATE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INTEREST_RATE_FAILED,
            message: er,
        })
    }
}
