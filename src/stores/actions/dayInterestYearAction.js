import * as api from '../../api/api';
import {DAY_INTEREST_YEAR_REQUEST, DAY_INTEREST_YEAR_SUCCESS, DAY_INTEREST_YEAR_FAILED} from './actionTypes';

export const getListDayInterestYear = fetchData => async (dispatch) => {
    dispatch({
        type: DAY_INTEREST_YEAR_REQUEST,
    })
    try {
        const res = await api.getListDayInterestYear();
        if (res) {
            return dispatch({
                type: DAY_INTEREST_YEAR_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: DAY_INTEREST_YEAR_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: DAY_INTEREST_YEAR_FAILED,
            message: er,
        })
    }
}