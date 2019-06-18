import * as api from '../../api/api';
import {COMPANY_REQUEST, COMPANY_SUCCESS, COMPANY_FAILED} from './actionTypes';

export const getListCompany = fetchData => async (dispatch) => {
    dispatch({
        type: COMPANY_REQUEST,
    })
    try {
        const res = await api.getListCompany();
        if (res) {
            return dispatch({
                type: COMPANY_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: COMPANY_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: COMPANY_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
