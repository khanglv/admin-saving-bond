import {FEE_TRADE_REQUEST, FEE_TRADE_SUCCESS, FEE_TRADE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case FEE_TRADE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case FEE_TRADE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case FEE_TRADE_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;