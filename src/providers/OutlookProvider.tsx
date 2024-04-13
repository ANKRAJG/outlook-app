import { ReactNode, createContext, useContext, useState } from "react";
import { Email } from "../components/types";
import { getOutlookDataInStorage } from "../data/storage";

type OutlookContextProps = {
    emailTypes: string[];
    selectedType: string;
    setSelectedType: (val: string) => void;
    selectedEmailList: Email[];
    setSelectedEmailList: (val: Email[]) => void;
    selectedEmail: Partial<Email>;
    setSelectedEmail: (email: Email) => void;
    openEmailMode: boolean;
    setOpenEmailMode: (mode: boolean) => void;
}
 
const OutlookContext = createContext<OutlookContextProps>({
    emailTypes: [], 
    selectedType: '',
    setSelectedType: () => {},
    selectedEmailList: [],
    setSelectedEmailList: () => {},
    selectedEmail: {},
    setSelectedEmail: () => {},
    openEmailMode: false,
    setOpenEmailMode: () => {}
});

type WithChildren = {
    children: ReactNode;
}
export const OutlookProvider = ({ children }: WithChildren) => {
    const emailTypes: string[] = [];
    const outlookData = getOutlookDataInStorage();
    Object.keys(outlookData).forEach((key) => {
        emailTypes.push(key);
    });
    const [selectedType, setSelectedType] = useState<string>(emailTypes[0]);
    const [selectedEmailList, setSelectedEmailList] = useState<Email[]>(outlookData[selectedType]);
    const initSelectedEmail = selectedEmailList[0].replys?.length ? selectedEmailList[0].replys[0] : selectedEmailList[0];
    const [selectedEmail, setSelectedEmail] = useState<Email>(initSelectedEmail);
    const [openEmailMode, setOpenEmailMode] = useState<boolean>(false);

    return (
        <OutlookContext.Provider value={{ 
            emailTypes, 
            selectedType, 
            setSelectedType, 
            selectedEmailList, 
            setSelectedEmailList,
            selectedEmail,
            setSelectedEmail,
            openEmailMode,
            setOpenEmailMode
        }}>
            { children }
        </OutlookContext.Provider>
    )
};

export const useOutlookContext = () => {
    const context = useContext(OutlookContext);
    if(context === undefined) {
        throw new Error('useOutlookContext must be within OutlookProvider');
    }
    return context;
}
