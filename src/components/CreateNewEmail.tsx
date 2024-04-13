import { Autocomplete, Box, Button, TextField } from "@mui/material";
import styles from './CreateNewEmail.module.css';
import { Send, DeleteOutline } from '@mui/icons-material';
import { ChangeEvent, useState } from "react";
import { emailList } from "../data/outlookData";
import { useOutlookContext } from "../providers/OutlookProvider";
import { getMaxOutlookId } from "../helpers/helper";
import { getOutlookDataInStorage, setOutlookDataInStorage } from "../data/storage";
import { EmailDetailsProps } from "./types";


const CreateNewEmail = () => {
    const { selectedEmailList, setSelectedEmailList, setOpenEmailMode } = useOutlookContext();
    const [toEmailDetails, setToEmailDetails] = useState<EmailDetailsProps[]>([]);
    const [subject, setSubject] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleToEmailListChange = (value: EmailDetailsProps[]) => {
        setToEmailDetails(value);
    };

    const handleSubjectChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const sendEmail = () => {
        const maxId = getMaxOutlookId();
        console.log('maxId = ', maxId);
        const emailObj = {
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

        selectedEmailList.push(emailObj);
        setSelectedEmailList(selectedEmailList);
        const outlookData = getOutlookDataInStorage();
        outlookData['sent-items'].push(emailObj);
        setOutlookDataInStorage(outlookData);
        setOpenEmailMode(false);
    };

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
                    <TextField fullWidth variant="standard" placeholder="Type subject..." 
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