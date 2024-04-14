import { List, ListItemButton, ListItemText } from "@mui/material";
import styles from './EmailTypes.module.css';
import { useOutlookContext } from "../providers/OutlookProvider";
import { getOutlookDataInStorage } from "../data/storage";

const EmailTypes = () => {
    const { 
        emailTypes, 
        selectedType, 
        setSelectedType, 
        setSelectedEmailList,
        setSelectedEmail,
        setOpenEmailMode
    } = useOutlookContext();

    const outlookData = getOutlookDataInStorage();

    const handleClick = (type: string) => {
        setOpenEmailMode(false);
        setSelectedType(type);
        setSelectedEmailList(outlookData[type]);
        const emailThread = outlookData[type][0];
        const emailOrReply = emailThread.replys.length>0 ? emailThread.replys[0] : emailThread;
        setSelectedEmail(emailOrReply);
    };

    return (      
        <List sx={{ padding: 0, borderTop: '1px solid #bbb' }}>
            {emailTypes.map((type, index) => (
                <ListItemButton key={index} className={styles.emailType + ' ' + (selectedType===type ? styles.active : '')}
                    onClick={() => handleClick(type)}>
                    <ListItemText>{ type }</ListItemText>
                </ListItemButton>
            ))}
        </List>
    );
}

export default EmailTypes;