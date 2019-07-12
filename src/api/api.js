import axios from 'axios';
import * as storage from './storage';
import NProgress from 'nprogress';
import { notification } from 'antd';

const BASE_URL = "http://10.11.0.113:3001";
const URL_FREFIX = `${BASE_URL}/prefix`;
const URL_COMPANY = `${BASE_URL}/company`;
const URL_BANK_INTERSET = `${BASE_URL}/interestRateBank`;
const URL_FEE_TRADE = `${BASE_URL}/feeTrade`;
const URL_PAYMENT_TERM = `${BASE_URL}/paymentTerm`;
const URL_BOND_TYPE = `${BASE_URL}/bondType`;
const URL_COMMAND_TYPE = `${BASE_URL}/commandType`;
const URL_TRADE_STATUS = `${BASE_URL}/tradeStatus`;
const URL_BRANCH_VCSC = `${BASE_URL}/branchVCSC`;
const URL_INVESTOR = `${BASE_URL}/investors`;
const URL_INVESTOR_TYPE = `${BASE_URL}/nhdtType`;
const URL_ENSURE_ASSETS = `${BASE_URL}/ensureAssets`;
const URL_DAY_INTEREST_YEAR = `${BASE_URL}/dateInterestYear`;
const URL_BOND_ASSET = `${BASE_URL}/bonds`;
const URL_CONTRACT_VCSC = `${BASE_URL}/contractVCSC`;
const URL_INTEREST_RATE_BUY = `${BASE_URL}/interestRateBuy`;
const URL_UPDATE_INTEREST_RATE_BUY_STATUS = `${URL_INTEREST_RATE_BUY}/updateItemInterest`;
const URL_INTEREST_RATE_SALE = `${BASE_URL}/interestRateSales`;
const URL_BOND_PRICE = `${BASE_URL}/bondPrice`;
const URL_ROOM_VCSC = `${BASE_URL}/roomVCSC`;
const URL_SET_COMMAND = `${BASE_URL}/setCommand`;
const URL_ASSETS = `${BASE_URL}/assets`;

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
                window.location.href = "/login";
                openNotificationWithIcon('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
            }
        
            return err.response.data;
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

//Prefix
export const getListFrefix = ()=>{
    const options = {
        url: URL_FREFIX,
        method: "GET",
    }
    return callApi(options);
}

export const createItemFrefix = (data)=>{
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

export const createItemCompany = (data)=>{
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

export const createItemBankInterest = (data)=>{
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

export const createItemFeeTrade = (data)=>{
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

//kỳ hạn thanh toán
export const getListPaymentTerm = ()=>{
    const options = {
        url: URL_PAYMENT_TERM,
        method: "GET",
    }
    return callApi(options);
}

export const createItemPaymentTerm = (data)=>{
    const options = {
        url: URL_PAYMENT_TERM,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemPaymentTerm = (data)=>{
    const options = {
        url: URL_PAYMENT_TERM,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemPaymentTerm = (data)=>{
    const options = {
        url: URL_PAYMENT_TERM,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Loại trái phiếu
export const getListBondType = ()=>{
    const options = {
        url: URL_BOND_TYPE,
        method: "GET",
    }
    return callApi(options);
}

export const createItemBondType = (data)=>{
    const options = {
        url: URL_BOND_TYPE,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemBondType = (data)=>{
    const options = {
        url: URL_BOND_TYPE,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemBondType = (data)=>{
    const options = {
        url: URL_BOND_TYPE,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Loại lệnh
export const getListCommandType = ()=>{
    const options = {
        url: URL_COMMAND_TYPE,
        method: "GET",
    }
    return callApi(options);
}

export const createItemCommandType = (data)=>{
    const options = {
        url: URL_COMMAND_TYPE,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemCommandType = (data)=>{
    const options = {
        url: URL_COMMAND_TYPE,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemCommandType = (data)=>{
    const options = {
        url: URL_COMMAND_TYPE,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Trạng thái giao dich
export const getListTradeStatus = ()=>{
    const options = {
        url: URL_TRADE_STATUS,
        method: "GET",
    }
    return callApi(options);
}

export const createItemTradeStatus = (data)=>{
    const options = {
        url: URL_TRADE_STATUS,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemTradeStatus = (data)=>{
    const options = {
        url: URL_TRADE_STATUS,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemTradeStatus = (data)=>{
    const options = {
        url: URL_TRADE_STATUS,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Chi nhánh VCSC
export const getListBranchVCSC = ()=>{
    const options = {
        url: URL_BRANCH_VCSC,
        method: "GET",
    }
    return callApi(options);
}

export const createItemBranchVCSC = (data)=>{
    const options = {
        url: URL_BRANCH_VCSC,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemBranchVCSC = (data)=>{
    const options = {
        url: URL_BRANCH_VCSC,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemBranchVCSC = (data)=>{
    const options = {
        url: URL_BRANCH_VCSC,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Loại nhà đầu tư
export const getListInvestorType = ()=>{
    const options = {
        url: URL_INVESTOR_TYPE,
        method: "GET",
    }
    return callApi(options);
}

export const createItemInvestorType = (data)=>{
    const options = {
        url: URL_INVESTOR_TYPE,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemInvestorType = (data)=>{
    const options = {
        url: URL_INVESTOR_TYPE,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemInvestorType = (data)=>{
    const options = {
        url: URL_INVESTOR_TYPE,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Nhà đầu tư
export const getListInvestor = ()=>{
    const options = {
        url: URL_INVESTOR,
        method: "GET",
    }
    return callApi(options);
}

export const createItemInvestor = (data)=>{
    const options = {
        url: URL_INVESTOR,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemInvestor = (data)=>{
    const options = {
        url: URL_INVESTOR,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemInvestor = (data)=>{
    const options = {
        url: URL_INVESTOR,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Tài sản đảm bảo
export const getListEnsureAsset = ()=>{
    const options = {
        url: URL_ENSURE_ASSETS,
        method: "GET",
    }
    return callApi(options);
}

export const createItemEnsureAsset = (data)=>{
    const options = {
        url: URL_ENSURE_ASSETS,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemEnsureAsset = (data)=>{
    const options = {
        url: URL_ENSURE_ASSETS,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemEnsureAsset = (data)=>{
    const options = {
        url: URL_ENSURE_ASSETS,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Hợp đồng mua VCSC
export const getListContractVCSC = ()=>{
    const options = {
        url: URL_CONTRACT_VCSC,
        method: "GET",
    }
    return callApi(options);
}

export const createItemContractVCSC = (data)=>{
    const options = {
        url: URL_CONTRACT_VCSC,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemContractVCSC = (data)=>{
    const options = {
        url: URL_CONTRACT_VCSC,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemContractVCSC = (data)=>{
    const options = {
        url: URL_CONTRACT_VCSC,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Ngày tính lãi trong năm
export const getListDayInterestYear = ()=>{
    const options = {
        url: URL_DAY_INTEREST_YEAR,
        method: "GET",
    }
    return callApi(options);
}

export const createItemDayInterestYear = (data)=>{
    const options = {
        url: URL_DAY_INTEREST_YEAR,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemDayInterestYear = (data)=>{
    const options = {
        url: URL_DAY_INTEREST_YEAR,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemDayInterestYear = (data)=>{
    const options = {
        url: URL_DAY_INTEREST_YEAR,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Trái phiếu
export const getListBondsAsset = ()=>{
    const options = {
        url: URL_BOND_ASSET,
        method: "GET",
    }
    return callApi(options);
}

export const createItemBondsAsset = (data)=>{
    const options = {
        url: URL_BOND_ASSET,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemBondsAsset = (data)=>{
    const options = {
        url: URL_BOND_ASSET,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemBondsAsset = (data)=>{
    const options = {
        url: URL_BOND_ASSET,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Lãi suất mua
export const getListInterestRate = ()=>{
    const options = {
        url: URL_INTEREST_RATE_BUY,
        method: "GET",
    }
    return callApi(options);
}

export const createItemInterestRate = (data)=>{
    const options = {
        url: URL_INTEREST_RATE_BUY,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemInterestRate = (data)=>{
    const options = {
        url: `${URL_INTEREST_RATE_BUY}/status`,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemInterestRate = (data)=>{
    const options = {
        url: URL_INTEREST_RATE_BUY,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

export const getListInterestBuyStatus = (bondID)=>{
    const options = {
        url: `${URL_INTEREST_RATE_BUY}/${bondID}`,
        method: "GET",
        data: ''
    }
    return callApi(options);
}

export const updateListInterestBuyStatus = (data)=>{ //update list interest status
    const options = {
        url: URL_UPDATE_INTEREST_RATE_BUY_STATUS,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

//Lãi suất bán
export const getListInterestRateSale = ()=>{
    const options = {
        url: URL_INTEREST_RATE_SALE,
        method: "GET",
    }
    return callApi(options);
}

export const createItemInterestRateSale = (data)=>{
    const options = {
        url: URL_INTEREST_RATE_SALE,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemInterestRateSale = (data)=>{
    const options = {
        url: URL_INTEREST_RATE_SALE,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemInterestRateSale = (data)=>{
    const options = {
        url: URL_INTEREST_RATE_SALE,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Giá trị trái phiếu
export const getListBondPrice = ()=>{
    const options = {
        url: URL_BOND_PRICE,
        method: "GET",
    }
    return callApi(options);
}

export const createItemBondPrice = (data)=>{
    const options = {
        url: URL_BOND_PRICE,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateItemBondPrice = (data)=>{
    const options = {
        url: URL_BOND_PRICE,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteItemBondPrice = (data)=>{
    const options = {
        url: URL_BOND_PRICE,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}

//Room VCSC
export const getListRoomVCSC = ()=>{
    const options = {
        url: URL_ROOM_VCSC,
        method: "GET",
    }
    return callApi(options);
}

//Set command
export const getListSetCommand = (status)=>{
    const options = {
        url: `${URL_SET_COMMAND}/${status}`,
        method: "GET",
    }
    return callApi(options);
}

export const updateApproveSetCommand = (data) => {
    const options = {
        url: `${URL_SET_COMMAND}/updateStatus`,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

//Tài sản
export const getListAssets = ()=>{
    const options = {
        url: URL_ASSETS,
        method: "GET",
    }
    return callApi(options);
}

export const createListAssets = (data)=>{
    const options = {
        url: URL_ASSETS,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const updateListAssets = (data)=>{
    const options = {
        url: URL_ASSETS,
        method: "PUT",
        data: data
    }
    return callApi(options);
}

export const deleteListAssets = (data)=>{
    const options = {
        url: URL_ASSETS,
        method: "DELETE",
        data: data
    }
    return callApi(options);
}