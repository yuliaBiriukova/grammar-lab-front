import moment from "moment";

export const formatDateToString = (date: Date): string => {
    return moment(date).format('DD/MM/YYYY HH:mm');
}