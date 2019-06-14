import * as api from '../../api/api';
import {INVESTOR_TYPE_REQUEST, INVESTOR_TYPE_SUCCESS, INVESTOR_TYPE_FAILED} from './actionTypes';

export const getListInvestorType = fetchData => async (dispatch) => {
    dispatch({
        type: INVESTOR_TYPE_REQUEST,
    })
    try {
        const res = await api.getListInvestorType();
        if (res) {
            return dispatch({
                type: INVESTOR_TYPE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INVESTOR_TYPE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INVESTOR_TYPE_FAILED,
            message: er,
        })
    }
}
