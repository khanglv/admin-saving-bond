import * as api from '../../api/api';
import {BONDS_ASSET_REQUEST, BONDS_ASSET_SUCCESS, BONDS_ASSET_FAILED} from './actionTypes';

export const getListBondsAsset = fetchData => async (dispatch) => {
    dispatch({
        type: BONDS_ASSET_REQUEST,
    })
    try {
        const res = await api.getListBondsAsset();
        if (res && !res.error) {
            return dispatch({
                type: BONDS_ASSET_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: BONDS_ASSET_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: BONDS_ASSET_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
