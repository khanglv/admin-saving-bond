import * as api from '../../api/api';
import {LIST_BONDS_INTEREST_RETURN_REQUEST, LIST_BONDS_INTEREST_RETURN_SUCCESS, LIST_BONDS_INTEREST_RETURN_FAILED} from './actionTypes';

export const getListBondsInterestReturn = fetchData => async (dispatch) => {
    dispatch({
        type: LIST_BONDS_INTEREST_RETURN_REQUEST,
    })
    try {
        const res = await api.getListBondsInterestReturn();
        if (res && !res.error) {
            return dispatch({
                type: LIST_BONDS_INTEREST_RETURN_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: LIST_BONDS_INTEREST_RETURN_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: LIST_BONDS_INTEREST_RETURN_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
