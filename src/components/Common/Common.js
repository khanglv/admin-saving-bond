import moment from 'moment';

export const convertDDMMYYYY = (date)=>{
    return moment(date).format('DD/MM/YYYY');
}