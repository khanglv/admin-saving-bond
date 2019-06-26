import * as api from '../../api/api';
import {BANK_INTEREST_REQUEST, BANK_INTEREST_SUCCESS, BANK_INTEREST_FAILED} from './actionTypes';

export const getListBankInterest = fetchData => async (dispatch) => {
    dispatch({
        type: BANK_INTEREST_REQUEST,
    })
    try {
        const res = await api.getListBankInterest();
        if (res && !res.error) {
            return dispatch({
                type: BANK_INTEREST_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: BANK_INTEREST_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: BANK_INTEREST_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
