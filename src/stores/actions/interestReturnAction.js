import * as api from '../../api/api';
import {
    INTEREST_RETURN_REQUEST, 
    INTEREST_RETURN_SUCCESS, 
    INTEREST_RETURN_FAILED
} from './actionTypes';

export const getListInterestReturn = fetchData => async (dispatch) => {
    dispatch({
        type: INTEREST_RETURN_REQUEST,
    })
    try {
        const res = await api.getListInterestReturn();
        if (res && !res.error) {
            return dispatch({
                type: INTEREST_RETURN_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INTEREST_RETURN_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INTEREST_RETURN_FAILED,
            message: er,
        })
    }
}