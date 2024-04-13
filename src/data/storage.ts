import { OutlookDataProps } from "../components/types";
import { outlookData } from "./outlookData";

export const setOutlookDataInStorage = (data: OutlookDataProps) => {
    if(data) {
        localStorage.setItem('outlookData', JSON.stringify(data));
    }
};

export const getOutlookDataInStorage = () => {
    const data = localStorage.getItem('outlookData');
    if(data) {
        return JSON.parse(data);
    }
    return outlookData;
};