import {PAYMENT_TERM_REQUEST, PAYMENT_TERM_SUCCESS, PAYMENT_TERM_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case PAYMENT_TERM_REQUEST:
            return{
                ...state,
                message: '',
            }
        case PAYMENT_TERM_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case PAYMENT_TERM_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;