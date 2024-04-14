import { ReactNode, createContext, useContext, useState } from "react";
import { Email } from "../components/types";
import { getOutlookDataInStorage } from "../data/storage";

type OutlookContextProps = {
    emailTypes: string[];
    selectedType: string;
    setSelectedType: (val: string) => void;
    selectedEmailList: Email[];
    setSelectedEmailList: (val: Email[]) => void;
    selectedEmail: Email;
    setSelectedEmail: (email: Email) => void;
    openEmailMode: boolean;
    setOpenEmailMode: (mode: boolean) => void;
    replyType: string;
    handleReply: (type: string) =>  void;
}

const initialEmailState = {
    id: 1,
    type: 'single',
    subject: '',
    description: '',
    from: '',
    senderName: '',
    to: [], 
    receiverNames: [],
    replys: []
};
 
const OutlookContext = createContext<OutlookContextProps>({
    emailTypes: [], 
    selectedType: '',
    setSelectedType: () => {},
    selectedEmailList: [],
    setSelectedEmailList: () => {},
    selectedEmail: initialEmailState,
    setSelectedEmail: () => {},
    openEmailMode: false,
    setOpenEmailMode: () => {},
    replyType: '',
    handleReply: () =>  {}
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
    const replys = selectedEmailList[0].replys;
    const initSelectedEmail = replys.length>0 ? replys[replys.length-1] : selectedEmailList[0];
    const [selectedEmail, setSelectedEmail] = useState<Email>(initSelectedEmail);
    const [openEmailMode, setOpenEmailMode] = useState<boolean>(false);
    const [replyType, setReplyType] = useState('');

    const handleReply = (type: string) => {
        setReplyType(type);
    };

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
            setOpenEmailMode,
            replyType,
            handleReply
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
