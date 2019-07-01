import {INVESTOR_REQUEST, INVESTOR_SUCCESS, INVESTOR_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case INVESTOR_REQUEST:
            return{
                ...state,
                message: '',
            }
        case INVESTOR_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case INVESTOR_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;