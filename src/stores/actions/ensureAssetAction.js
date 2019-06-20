import * as api from '../../api/api';
import {ENSURE_ASSET_REQUEST, ENSURE_ASSET_SUCCESS, ENSURE_ASSET_FAILED} from './actionTypes';

export const getListEnsureAsset = fetchData => async (dispatch) => {
    dispatch({
        type: ENSURE_ASSET_REQUEST,
    })
    try {
        const res = await api.getListEnsureAsset();
        if (res && !res.error) {
            return dispatch({
                type: ENSURE_ASSET_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: ENSURE_ASSET_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: ENSURE_ASSET_FAILED,
            message: er,
        })
    }
}
