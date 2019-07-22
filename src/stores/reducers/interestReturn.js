import {
    INTEREST_RETURN_REQUEST, 
    INTEREST_RETURN_SUCCESS, 
    INTEREST_RETURN_FAILED
} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: '',
    lstInterestStatus: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case INTEREST_RETURN_REQUEST:
            return{
                ...state,
                message: '',
            }
        case INTEREST_RETURN_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case INTEREST_RETURN_FAILED:
            return {
                ...state,
                message: action.message
            }
        default: 
            return state;
    }
}

export default reducer;