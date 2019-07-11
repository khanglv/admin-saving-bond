import * as api from '../../api/api';
import {
    INTEREST_RATE_REQUEST, 
    INTEREST_RATE_SUCCESS, 
    INTEREST_RATE_FAILED,
    GET_LIST_INTEREST_RATE_STATUS_REQUEST,
    GET_LIST_INTEREST_RATE_STATUS_SUCCESS,
    GET_LIST_INTEREST_RATE_STATUS_FAILED
} from './actionTypes';

export const getListInterestRate = fetchData => async (dispatch) => {
    dispatch({
        type: INTEREST_RATE_REQUEST,
    })
    try {
        const res = await api.getListInterestRate();
        if (res && !res.error) {
            return dispatch({
                type: INTEREST_RATE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INTEREST_RATE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INTEREST_RATE_FAILED,
            message: er,
        })
    }
}

export const getListInterestBuyStatus = fetchData => async (dispatch) => {
    dispatch({
        type: GET_LIST_INTEREST_RATE_STATUS_REQUEST,
    })
    try {
        const res = await api.getListInterestBuyStatus(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: GET_LIST_INTEREST_RATE_STATUS_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_LIST_INTEREST_RATE_STATUS_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_LIST_INTEREST_RATE_STATUS_FAILED,
            message: er,
        })
    }
}