import * as api from '../../api/api';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from './actionTypes';

export const loginRequest = (username)=>{
    return {
        type: LOGIN_REQUEST,
        username
    }
}

const loginSuccess= (info)=>{
    return {
        type: LOGIN_SUCCESS,
        info
    }
}

const loginFailed = (errorMessage, status)=>{
    return {
        type: LOGIN_FAILED,
        message: errorMessage,
        status: status
    }
}

export const login = (username, password)=> (dispatch)=>{
    dispatch(loginRequest(username));
    return api.loginApi(username, password).then((response)=>{
        if(response && response.token){
            localStorage.setItem('accessTokenAuthKey', response.token);
            localStorage.setItem('accountInfoKey', JSON.stringify(response.user))
            return dispatch(loginSuccess(response));
        }
        return dispatch(loginFailed(response.data.error, response.status));
    }).catch(err=>{
        console.log("login err " + JSON.stringify(err));
    });
}