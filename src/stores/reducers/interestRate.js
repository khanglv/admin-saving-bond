import {
    INTEREST_RATE_REQUEST, 
    INTEREST_RATE_SUCCESS, 
    INTEREST_RATE_FAILED,
    GET_LIST_INTEREST_RATE_STATUS_REQUEST,
    GET_LIST_INTEREST_RATE_STATUS_SUCCESS,
    GET_LIST_INTEREST_RATE_STATUS_FAILED
} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: '',
    lstInterestStatus: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case INTEREST_RATE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case INTEREST_RATE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case INTEREST_RATE_FAILED:
            return {
                ...state,
                message: action.message,
            }
        case GET_LIST_INTEREST_RATE_STATUS_REQUEST:
            return{
                ...state,
                message: '',
            }
        case GET_LIST_INTEREST_RATE_STATUS_SUCCESS:
            return{
                ...state,
                lstInterestStatus: action.data
            }
        case GET_LIST_INTEREST_RATE_STATUS_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;