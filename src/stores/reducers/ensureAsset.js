import {ENSURE_ASSET_REQUEST, ENSURE_ASSET_SUCCESS, ENSURE_ASSET_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ENSURE_ASSET_REQUEST:
            return{
                ...state,
                message: '',
            }
        case ENSURE_ASSET_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case ENSURE_ASSET_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;