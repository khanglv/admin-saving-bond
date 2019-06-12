import axios from 'axios';
import * as storage from './storage';
import NProgress from 'nprogress';
import { notification } from 'antd';

const BASE_URL = "http://10.11.0.113:3001";
const URL_FREFIX = `${BASE_URL}/prefix`;
const URL_COMPANY = `${BASE_URL}/company`;
const URL_BANK_INTERSET = `${BASE_URL}/interest`;
const URL_FEE_TRADE = `${BASE_URL}/feeTrade`;
const TIME_OUT = 10000;

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

const doRequest = async (options) => {
    try{
        NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        }
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            NProgress.done();
            return response.data;
        }
    }catch(err){
        NProgress.done();
        console.log(err.response);
        if(err.response){
            if(err.response.status === 401){
                openNotificationWithIcon('error', 'Your request in valid, try again !!!');
            }
            if(err.response.status === 501){
                openNotificationWithIcon('error', 'Request timeout, try again !!!');
            }
            if(err.response.status === 403){
                openNotificationWithIcon('error', 'Bạn không có quyền truy cập !!!');
            }
        
            return err.response;
        }else{
            openNotificationWithIcon('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }
}

const callApi = (options, needAuth = true)=>{
    if(needAuth){
        const accessTokenAuth = storage.accessTokenAuth();
        if(accessTokenAuth){
            options = {
                ...options,
                headers: {
                    Authorization: `Bearer ${accessTokenAuth}`
                }
            }
        }else{
            openNotificationWithIcon('error', 'Không thể xác thực api');
        }
    }
    return doRequest(options);
}

//Login
export const loginApi = (userName, password)=>{
    const url = `${BASE_URL}/login`;
    const data = {
        "USERNAME": userName,
        "PASSWORD": password
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false);
}

//frefix
export const getListFrefix = ()=>{
    const options = {
        url: URL_FREFIX,
        method: "GET",
    }
    return callApi(options);
}

export const creatItemFrefix = (data)=>{
    const options = {
        url: URL_FREFIX,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemFrefix = (data)=>{
    const options = {
        url: URL_FREFIX,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemFrefix = (data)=>{
    const options = {
        url: URL_FREFIX,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//company
export const getListCompany = ()=>{
    const options = {
        url: URL_COMPANY,
        method: "GET",
    }
    return callApi(options);
}

export const creatItemCompany = (data)=>{
    const options = {
        url: URL_COMPANY,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemCompany = (data)=>{
    const options = {
        url: URL_COMPANY,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemCompany = (data)=>{
    const options = {
        url: URL_COMPANY,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}


//Lãi suất ngân hàng
export const getListBankInterest = ()=>{
    const options = {
        url: URL_BANK_INTERSET,
        method: "GET",
    }
    return callApi(options);
}

export const creatItemBankInterest = (data)=>{
    const options = {
        url: URL_BANK_INTERSET,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemBankInterest = (data)=>{
    const options = {
        url: URL_BANK_INTERSET,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemBankInterest = (data)=>{
    const options = {
        url: URL_BANK_INTERSET,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Chi phí giao dịch
export const getListFeeTrade = ()=>{
    const options = {
        url: URL_FEE_TRADE,
        method: "GET",
    }
    return callApi(options);
}

export const creatItemFeeTrade = (data)=>{
    const options = {
        url: URL_FEE_TRADE,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemFeeTrade = (data)=>{
    const options = {
        url: URL_FEE_TRADE,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemFeeTrade = (data)=>{
    const options = {
        url: URL_FEE_TRADE,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}