import moment from 'moment';

export const convertDDMMYYYY = (date)=>{
    return moment(new Date(date)).format('DD/MM/YYYY');
}

export const convertToFormat = (date)=>{
    let dateTmp = date.split("/").reverse().join("/");
    return new Date(dateTmp).toISOString();
}

export const convertDatePicker = (date)=>{
    return moment(new Date(date));
}