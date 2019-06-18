import * as api from '../../api/api';
import {FREFIX_REQUEST, FREFIX_SUCCESS, FREFIX_FAILED} from './actionTypes';

export const getListFrefix = fetchData => async (dispatch) => {
    dispatch({
        type: FREFIX_REQUEST,
    })
    try {
        const res = await api.getListFrefix();
        if (res) {
            return dispatch({
                type: FREFIX_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: FREFIX_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: FREFIX_FAILED,
            message: er,
        })
    }
}
