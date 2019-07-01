import * as api from '../../api/api';
import {INVESTOR_REQUEST, INVESTOR_SUCCESS, INVESTOR_FAILED} from './actionTypes';

export const getListInvestor = fetchData => async (dispatch) => {
    dispatch({
        type: INVESTOR_REQUEST,
    })
    try {
        const res = await api.getListInvestor();
        if (res && !res.error) {
            return dispatch({
                type: INVESTOR_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INVESTOR_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INVESTOR_FAILED,
            message: er,
        })
    }
}
