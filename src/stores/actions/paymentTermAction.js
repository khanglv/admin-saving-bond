import * as api from '../../api/api';
import {PAYMENT_TERM_REQUEST, PAYMENT_TERM_SUCCESS, PAYMENT_TERM_FAILED} from './actionTypes';

export const getListPaymentTerm = fetchData => async (dispatch) => {
    dispatch({
        type: PAYMENT_TERM_REQUEST,
    })
    try {
        const res = await api.getListPaymentTerm();
        if (res) {
            return dispatch({
                type: PAYMENT_TERM_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: PAYMENT_TERM_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: PAYMENT_TERM_FAILED,
            message: er,
        })
    }
}
