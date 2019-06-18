import {DAY_INTEREST_YEAR_REQUEST, DAY_INTEREST_YEAR_SUCCESS, DAY_INTEREST_YEAR_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case DAY_INTEREST_YEAR_REQUEST:
            return{
                ...state,
                message: '',
            }
        case DAY_INTEREST_YEAR_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case DAY_INTEREST_YEAR_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;