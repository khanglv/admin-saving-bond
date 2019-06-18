import * as api from '../../api/api';
import {BRANCH_VCSC_REQUEST, BRANCH_VCSC_SUCCESS, BRANCH_VCSC_FAILED} from './actionTypes';

export const getListBranchVCSC = fetchData => async (dispatch) => {
    dispatch({
        type: BRANCH_VCSC_REQUEST,
    })
    try {
        const res = await api.getListBranchVCSC();
        if (res) {
            return dispatch({
                type: BRANCH_VCSC_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: BRANCH_VCSC_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: BRANCH_VCSC_FAILED,
            message: "Kiểm tra kết nối",
        })
    }
}
