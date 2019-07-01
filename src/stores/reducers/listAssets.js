import {LIST_ASSETS_REQUEST, LIST_ASSETS_SUCCESS, LIST_ASSETS_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LIST_ASSETS_REQUEST:
            return{
                ...state,
                message: '',
            }
        case LIST_ASSETS_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case LIST_ASSETS_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;