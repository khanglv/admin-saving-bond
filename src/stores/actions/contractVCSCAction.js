import * as api from '../../api/api';
import {CONTRACT_VCSC_REQUEST, CONTRACT_VCSC_SUCCESS, CONTRACT_VCSC_FAILED} from './actionTypes';

export const getListContractVCSC = fetchData => async (dispatch) => {
    dispatch({
        type: CONTRACT_VCSC_REQUEST,
    })
    try {
        const res = await api.getListContractVCSC();
        if (res) {
            return dispatch({
                type: CONTRACT_VCSC_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: CONTRACT_VCSC_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: CONTRACT_VCSC_FAILED,
            message: er,
        })
    }
}
