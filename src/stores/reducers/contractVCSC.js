import {CONTRACT_VCSC_REQUEST, CONTRACT_VCSC_SUCCESS, CONTRACT_VCSC_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case CONTRACT_VCSC_REQUEST:
            return{
                ...state,
                message: '',
            }
        case CONTRACT_VCSC_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case CONTRACT_VCSC_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;