import {FREFIX_REQUEST, FREFIX_SUCCESS, FREFIX_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case FREFIX_REQUEST:
            return{
                ...state,
                message: '',
            }
        case FREFIX_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case FREFIX_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;