import * as api from '../../api/api';
import {BOND_PRICE_REQUEST, BOND_PRICE_SUCCESS, BOND_PRICE_FAILED} from './actionTypes';

export const getListBondPrice = fetchData => async (dispatch) => {
    dispatch({
        type: BOND_PRICE_REQUEST,
    })
    try {
        const res = await api.getListBondPrice();
        if (res && !res.error) {
            return dispatch({
                type: BOND_PRICE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: BOND_PRICE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: BOND_PRICE_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
