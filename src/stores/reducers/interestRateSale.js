import {
    INTEREST_RATE_SALE_REQUEST, 
    INTEREST_RATE_SALE_SUCCESS, 
    INTEREST_RATE_SALE_FAILED
} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: '',
    lstInterestStatus: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case INTEREST_RATE_SALE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case INTEREST_RATE_SALE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case INTEREST_RATE_SALE_FAILED:
            return {
                ...state,
                message: action.message
            }
        default: 
            return state;
    }
}

export default reducer;