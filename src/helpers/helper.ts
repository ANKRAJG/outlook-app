import { Email } from "../components/types";
import { getOutlookDataInStorage } from "../data/storage";

type MaxIdFucntion = (arr: Email[], currMax: number) => number;
const getMaxId: MaxIdFucntion = (arr: Email[], currMax: number) => {
    return arr.reduce((max, item) => {
        if(max<item.id) {
            max = item.id;
        }
        return item.type==='group' ? getMaxId(item.replys, max) : max;
        // return getMaxId(item.replys, max);       // This will also work.
    }, currMax);
}

export const getMaxOutlookId = () => {
    let maxId = 0;
    const outlookData = getOutlookDataInStorage();
    Object.keys(outlookData).forEach((key) => {
        maxId = getMaxId(outlookData[key], maxId);
    });
    return maxId;
}