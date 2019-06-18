import {COMPANY_REQUEST, COMPANY_SUCCESS, COMPANY_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case COMPANY_REQUEST:
            return{
                ...state,
                message: '',
            }
        case COMPANY_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case COMPANY_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;