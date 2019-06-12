export const accessTokenAuth = ()=>{
    return localStorage.getItem('accessTokenAuthKey');
}

export const accountInfo = ()=>{
    return JSON.parse(localStorage.getItem('accountInfoKey'));
}


export const removeStorageToken = ()=>{
    localStorage.removeItem('accessTokenAuthKey');
    localStorage.removeItem("accountInfoKey");
    return '';
}