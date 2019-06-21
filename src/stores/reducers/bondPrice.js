import {BOND_PRICE_REQUEST, BOND_PRICE_SUCCESS, BOND_PRICE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case BOND_PRICE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case BOND_PRICE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case BOND_PRICE_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;