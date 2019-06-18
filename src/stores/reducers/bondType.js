import {BOND_TYPE_REQUEST, BOND_TYPE_SUCCESS, BOND_TYPE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case BOND_TYPE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case BOND_TYPE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case BOND_TYPE_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;