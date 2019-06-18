import {BRANCH_VCSC_REQUEST, BRANCH_VCSC_SUCCESS, BRANCH_VCSC_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case BRANCH_VCSC_REQUEST:
            return{
                ...state,
                message: '',
            }
        case BRANCH_VCSC_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case BRANCH_VCSC_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;