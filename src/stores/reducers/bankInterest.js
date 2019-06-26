import {BANK_INTEREST_REQUEST, BANK_INTEREST_SUCCESS, BANK_INTEREST_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case BANK_INTEREST_REQUEST:
            return{
                ...state,
                message: '',
            }
        case BANK_INTEREST_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case BANK_INTEREST_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;