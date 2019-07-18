import * as api from '../../api/api';
import {FEE_TRADE_REQUEST, FEE_TRADE_SUCCESS, FEE_TRADE_FAILED} from './actionTypes';

export const getListFeeTrade = fetchData => async (dispatch) => {
    dispatch({
        type: FEE_TRADE_REQUEST,
    })
    try {
        const res = await api.getListFeeTrade();
        if (res && !res.error) {
            return dispatch({
                type: FEE_TRADE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: FEE_TRADE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: FEE_TRADE_FAILED,
            message: er,
        })
    }
}
