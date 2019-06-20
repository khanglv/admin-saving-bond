import * as api from '../../api/api';
import {BOND_TYPE_REQUEST, BOND_TYPE_SUCCESS, BOND_TYPE_FAILED} from './actionTypes';

export const getListBondType = fetchData => async (dispatch) => {
    dispatch({
        type: BOND_TYPE_REQUEST,
    })
    try {
        const res = await api.getListBondType();
        if (res && !res.error) {
            return dispatch({
                type: BOND_TYPE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: BOND_TYPE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: BOND_TYPE_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
