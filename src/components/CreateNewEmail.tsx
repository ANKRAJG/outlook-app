import { Autocomplete, Box, Button, TextField } from "@mui/material";
import styles from './CreateNewEmail.module.css';
import { Send, DeleteOutline } from '@mui/icons-material';
import { ChangeEvent, useEffect, useState } from "react";
import { emailList } from "../data/outlookData";
import { useOutlookContext } from "../providers/OutlookProvider";
import { getMaxOutlookId } from "../helpers/helper";
import { getOutlookDataInStorage, setOutlookDataInStorage } from "../data/storage";
import { Email, EmailDetailsProps } from "./types";


const CreateNewEmail = () => {
    const { 
        selectedEmailList, 
        setSelectedEmailList, 
        setOpenEmailMode, 
        replyType, 
        selectedEmail, 
        selectedType 
    } = useOutlookContext();
    const [toEmailDetails, setToEmailDetails] = useState<EmailDetailsProps[]>([]);
    const initSubject = ['reply', 'replyAll'].indexOf(replyType)>-1 ? selectedEmail.subject : '';
    const [subject, setSubject] = useState<string>(initSubject);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        const prepareDefaultListInCaseOfReply = () => {
            let defaultToList: EmailDetailsProps[] = [];
            const newTo = selectedEmail.to.filter(e => e!=='ankit@gupta.com');
            if(replyType === 'reply') {
                const to = selectedEmail.from!=='ankit@gupta.com' ? selectedEmail.from : newTo[0];
                defaultToList = emailList.filter(e => [to].indexOf(e.email)>-1);
            } else {
                if(selectedEmail.from!=='ankit@gupta.com')
                    newTo.unshift(selectedEmail.from);
                defaultToList = emailList.filter(e => newTo.indexOf(e.email)>-1);
            }
            console.log('defaultToList = ', defaultToList);
            setToEmailDetails(defaultToList);
        }
    
        if(['reply', 'replyAll'].indexOf(replyType)>-1) {
            prepareDefaultListInCaseOfReply();  
        }
    }, [replyType, selectedEmail.from, selectedEmail.to])

    const handleToEmailListChange = (value: EmailDetailsProps[]) => {
        setToEmailDetails(value);
    };

    const handleSubjectChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const getParentForSingle = (p: Email, c: Email, emailObj: Email) => {
        const maxId = getMaxOutlookId();
        c.id = maxId+1;
        c.type = 'firstReply';
        c.parentId = p.id;
        p.replys = [c];
        emailObj.id = maxId+2;
        return p;
    };

    const getParentObjForReplyCases = (emailObj: Email) => {
        let parent = { ...selectedEmail };
        if(['reply', 'firstReply'].indexOf(selectedEmail.type) > -1) {
            parent = selectedEmailList.filter(e => e.id===selectedEmail.parentId)[0];
        } else {
            const newParent = getParentForSingle(selectedEmail, parent, emailObj);
            parent = { ...newParent };
        }
        emailObj.parentId = parent.id;
        emailObj.type = 'reply';

        parent.subject = emailObj.subject;
        parent.receiverNames = emailObj.receiverNames;
        parent.to = emailObj.to;
        parent.type = 'group';
        parent.replys.push(emailObj);
        return parent;
    }

    const sendEmail = () => {
        const maxId = getMaxOutlookId();
        const emailObj: Email = {
            id: maxId+1,
            type: 'single',
            subject,
            description,
            from: 'ankit@gupta.com',
            senderName: 'Ankit Gupta',
            to: toEmailDetails.map(ed => ed.email), 
            receiverNames: toEmailDetails.map(ed => ed.name), 
            replys: []
        }
        const outlookData = getOutlookDataInStorage();
        if(['reply', 'replyAll'].indexOf(replyType)>-1) {
            const parent = getParentObjForReplyCases(emailObj);
            // selectedEmailList.push(parent);
            const index = selectedEmailList.findIndex((item: Email) => item.id === parent.id);
            selectedEmailList[index] = parent;
            setSelectedEmailList(selectedEmailList);
            outlookData[selectedType] = selectedEmailList;
            const index2 = outlookData['sent-items'].findIndex((item: Email) => item.id === parent.id);
            if(index2 === -1) {
                outlookData['sent-items'].unshift(parent);
            } else {
                outlookData['sent-items'][index2] = parent;
            }
        } else {
            // In case of normal mail
            selectedEmailList.push(emailObj);
            setSelectedEmailList(selectedEmailList);
            outlookData['sent-items'].unshift(emailObj);
        }
        setOutlookDataInStorage(outlookData);
        setOpenEmailMode(false);
    };

    const discardEmail = () => {
        setOpenEmailMode(false);
    }

    return (
        <Box p={3} className={styles.createEmailWrapper}>
            <Box>
                <Button sx={{ mr: 3 }} variant="text" size="medium" 
                    startIcon={<Send sx={{ pt:0.75 }} />}
                    disabled={toEmailDetails.length===0}
                    onClick={sendEmail}
                >
                    Send
                </Button>
                <Button variant="text" size="medium" 
                    startIcon={<DeleteOutline sx={{ pt:0.5 }} />}
                    onClick={discardEmail}
                >
                    Discard
                </Button>
            </Box>
            <Box py={0}>
                <span style={{ width:'8.5%', top:'-24px', position:'relative' }}>From: </span>
                <span style={{ width:'91.5%' }}>
                    <p style={{ marginBottom:10 }}>ankit@gupta.com</p><hr />
                </span>
            </Box>
            <Box py={1}>
                <span style={{ width:'8.5%', top:'5px', position:'relative' }}>To: </span>
                <span style={{ width:'91.5%' }}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={emailList}
                        getOptionLabel={(option) => option.email}
                        onChange={(e, val) => handleToEmailListChange(val)}
                        value={toEmailDetails}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Type emails"
                            />
                        )}
                    />
                </span>
            </Box>
            <Box py={1.5}>
                <span style={{ width:'8.5%', top:'10px', position:'relative' }}>Subject: </span>
                <span style={{ width:'91.5%' }}>
                    <TextField value={subject} fullWidth variant="standard" placeholder="Type subject..." 
                        onChange={handleSubjectChange} />
                </span>
            </Box>
            <Box py={3}>
                <TextField
                    fullWidth
                    id="filled-multiline-static"
                    multiline
                    rows={30}
                    variant="filled"
                    onChange={handleDescriptionChange}
                />
            </Box>
        </Box>
    );
};

export default CreateNewEmail;