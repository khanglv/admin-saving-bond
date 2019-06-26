import {SET_COMMAND_REQUEST, SET_COMMAND_SUCCESS, SET_COMMAND_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_COMMAND_REQUEST:
            return{
                ...state,
                message: '',
            }
        case SET_COMMAND_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case SET_COMMAND_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;