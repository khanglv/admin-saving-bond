import {INTEREST_RATE_REQUEST, INTEREST_RATE_SUCCESS, INTEREST_RATE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
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
        default: 
            return state;
    }
}

export default reducer;