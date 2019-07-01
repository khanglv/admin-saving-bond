import * as api from '../../api/api';
import {LIST_ASSETS_REQUEST, LIST_ASSETS_SUCCESS, LIST_ASSETS_FAILED} from './actionTypes';

export const getListAssets = fetchData => async (dispatch) => {
    dispatch({
        type: LIST_ASSETS_REQUEST,
    })
    try {
        const res = await api.getListAssets();
        if (res && !res.error) {
            return dispatch({
                type: LIST_ASSETS_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: LIST_ASSETS_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: LIST_ASSETS_FAILED,
            message: er,
        })
    }
}
