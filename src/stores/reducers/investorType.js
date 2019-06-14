import {INVESTOR_TYPE_REQUEST, INVESTOR_TYPE_SUCCESS, INVESTOR_TYPE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case INVESTOR_TYPE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case INVESTOR_TYPE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case INVESTOR_TYPE_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;