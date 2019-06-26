import * as api from '../../api/api';
import {SET_COMMAND_REQUEST, SET_COMMAND_SUCCESS, SET_COMMAND_FAILED} from './actionTypes';

export const getListSetCommand = fetchData => async (dispatch) => {
    dispatch({
        type: SET_COMMAND_REQUEST,
    })
    try {
        const res = await api.getListSetCommand();
        if (res && !res.error) {
            return dispatch({
                type: SET_COMMAND_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: SET_COMMAND_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: SET_COMMAND_FAILED,
            message: er,
        })
    }
}
