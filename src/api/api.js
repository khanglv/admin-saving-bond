import axios from 'axios';
import NProgress from 'nprogress';
import { notification } from 'antd';

const BASE_URL = "http://10.11.0.113:3001";
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
            timeout: TIME_OUT
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
        
            return err.response.data;
        }else{
            openNotificationWithIcon('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }
}

export const getListFrefix = ()=>{
    const url = `${BASE_URL}/prefix`;
    const options = {
        url: url,
        method: "GET",
    }
    return doRequest(options);
}