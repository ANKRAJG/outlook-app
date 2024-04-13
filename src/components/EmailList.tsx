import { Avatar, Collapse, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import styles from './EmailList.module.css';
import { useOutlookContext } from "../providers/OutlookProvider";
import { Fragment, MouseEvent } from "react";
import { Email } from "./types";
import { ExpandLess, ExpandMore, DeleteOutlined } from "@mui/icons-material";
import { colorMap } from "../data/outlookData";
import { getOutlookDataInStorage, setOutlookDataInStorage } from "../data/storage";

const EmailList = () => {
    const {
        selectedType,
        selectedEmailList, 
        selectedEmail,
        setSelectedEmail,
        setSelectedEmailList,
        setOpenEmailMode
    } = useOutlookContext();

    const colors: string[] = colorMap[selectedType as keyof typeof colorMap];
    selectedEmailList.forEach((email, idx) => {
        email.color = colors[idx];
    });

    const handleToggleClick = (email: Email) => {
        setOpenEmailMode(false);
        if(email.subject === selectedEmail.subject)
            return;
        const emailOrReply = email.type==='group' ? email.replys[0] : email;
        setSelectedEmail(emailOrReply);
        selectedEmailList.forEach(e => e.expanded=false);
        if(email.type!=='group')
            return;
        email.expanded = true;
    };

    const handleReplyClick = (e: MouseEvent<HTMLDivElement>, reply: Email) => {
        e.stopPropagation();
        setOpenEmailMode(false);
        setSelectedEmail(reply);
    }

    const deleteEmail = (id: number) => {
        const i = selectedEmailList.findIndex((email) => email.id===id);
        selectedEmailList.splice(i, 1);
        setSelectedEmailList(selectedEmailList);
        const outlookData = getOutlookDataInStorage();
        outlookData[selectedType] = selectedEmailList;
        setOutlookDataInStorage(outlookData);
    };

    const createInitials = (email: Email) => {
        const name = email.senderName ?? email.from;
        const nameArr = name.split(' ');
        let initials = '';
        nameArr.forEach((item, idx) => {
            if(idx < 2) {
                initials += item.charAt(0).toUpperCase();
            }
        });
        return initials;
    }

    return (
        <List component="nav" sx={{ width: '100%', padding: 0, borderTop: '1px solid #bbb' }}>
            {selectedEmailList.map((email) => (
                <ListItemButton key={email.id} className={styles.emailBox  + ' ' + (selectedEmail.subject===email.subject ? styles.active : '')}
                    onClick={handleToggleClick.bind(null, email)}
                    sx={{ display: 'inline-block', width: '100%'}}
                >
                    <ListItemAvatar className={styles.avatarWrapper} style={{ paddingLeft: email.type==='group' ? 4 : 28 }}>
                        <Avatar style={{ backgroundColor: `${email.color}` }}>
                            {createInitials(email)}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email.senderName || email.from} 
                        sx={{ display: 'inline-block', pl:0 }}
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {email.subject.length <= 40 ? email.subject : (email.subject.substr(0, 40) + "...")}
                                </Typography>
                                <div>{email.description.length <= 40 ? email.description : (email.description.substr(0, 40) + "...")}</div>
                            </Fragment>
                        } 
                    />
                    {email.type==='group' ? 
                        <span className={styles.collapseWrapper}>
                            {email.expanded ? <ExpandLess /> : <ExpandMore />}
                        </span> : ''
                    }
                    <span className={styles.deleteWrapper}>
                        <DeleteOutlined sx={{ color:'#666' }} onClick={() => deleteEmail(email.id)} />
                    </span>
                    {email.type==='group' &&
                        <Collapse in={email.expanded} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {email.replys.map((reply) => (
                                    <ListItemButton key={reply.id}
                                        className={`${styles.replyEmailBox} ${selectedEmail.id===reply.id ? styles.activeReply : ''}`}
                                        onClick={(e) => handleReplyClick(e, reply)}>
                                        <ListItemText 
                                            primary={reply.senderName || reply.from} 
                                            secondary={
                                                <Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {reply.description.length <= 40 ? email.description : (reply.description.substr(0, 40) + "...")}
                                                    </Typography>
                                                </Fragment>
                                            } 
                                        />
                                        <span className={styles.deleteReplyWrapper} style={{ top:0 }}>
                                            <DeleteOutlined sx={{ color:'#666' }} />
                                        </span>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    }
                </ListItemButton>
            ))}
        </List>
    )
};

export default EmailList;