import moment from 'moment';

export const convertDDMMYYYY = (date)=>{
    return moment(date).format('DD/MM/YYYY');
}

export const convertToFormat = (date)=>{
    let dateTmp = date.split("/").reverse().join("/");
    return new Date(dateTmp).toISOString();
}