import {BONDS_ASSET_REQUEST, BONDS_ASSET_SUCCESS, BONDS_ASSET_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case BONDS_ASSET_REQUEST:
            return{
                ...state,
                message: '',
            }
        case BONDS_ASSET_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case BONDS_ASSET_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;