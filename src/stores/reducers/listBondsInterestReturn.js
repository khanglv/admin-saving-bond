import {LIST_BONDS_INTEREST_RETURN_REQUEST, LIST_BONDS_INTEREST_RETURN_SUCCESS, LIST_BONDS_INTEREST_RETURN_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LIST_BONDS_INTEREST_RETURN_REQUEST:
            return{
                ...state,
                message: '',
            }
        case LIST_BONDS_INTEREST_RETURN_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case LIST_BONDS_INTEREST_RETURN_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;