import { Avatar, Collapse, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import styles from './EmailList.module.css';
import { useOutlookContext } from "../providers/OutlookProvider";
import { Fragment, MouseEvent, useEffect, useState } from "react";
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

    const [openMail, setOpenMail] = useState({open: selectedEmailList[0].id});

    useEffect(() => {
        // On Email Type change, we expand the first email from the list.
        setOpenMail({open: selectedEmailList[0].id});
    }, [selectedType, selectedEmailList]);

    const colors: string[] = colorMap[selectedType as keyof typeof colorMap];
    selectedEmailList.forEach((email, idx) => {
        const rem = idx % colors.length;
        email.color = colors[rem];
    });

    const handleToggleClick = (email: Email) => {
        setOpenEmailMode(false);
        if(email.id === selectedEmail.id || email.id === selectedEmail.parentId) {
            setOpenMail({ open: email.id });
            return;
        }
        email.replys.sort((a, b) => b.id-a.id);
        const emailOrReply = email.type==='group' ? email.replys[0] : email;
        setSelectedEmail(emailOrReply);
        // if(email.type!=='group')
        //     return;
        setOpenMail(prevState => {
            return { open: prevState.open === email.id ? -1 : email.id }
        });
    };

    const handleReplyClick = (e: MouseEvent<HTMLDivElement>, reply: Email) => {
        e.stopPropagation();
        setOpenEmailMode(false);
        setSelectedEmail(reply);
    }

    const deleteEmail = (id: number) => {
        const i = selectedEmailList.findIndex((email) => email.id===id);
        const deletedMail = selectedEmailList.splice(i, 1);
        setSelectedEmailList(selectedEmailList);
        const outlookData = getOutlookDataInStorage();
        outlookData[selectedType] = selectedEmailList;
        if(selectedType !== 'deleted-items') {
            outlookData['deleted-items'].push(deletedMail[0]);
        }
        setOutlookDataInStorage(outlookData);
    };

    const getDisplayName = (email: Email) => {
        let name = '';
        if(['inbox', 'deleted-items'].indexOf(selectedType) > -1) {
            name = email.senderName ?? email.from;
        } else {
            name = (email.receiverNames[0] && email.receiverNames[0]!=='') ? email.receiverNames[0] : email.to[0];
        }
        return name;
    }

    const createInitials = (email: Email) => {
        const name = getDisplayName(email);
        const nameArr = name.split(' ');
        let initials = '';
        nameArr.forEach((item, idx) => {
            if(idx < 2) {
                initials += item.charAt(0).toUpperCase();
            }
        });
        return initials;
    }

    const collapse = (e: MouseEvent<SVGElement>, email: Email) => {
        e.stopPropagation();
        setOpenMail(prevState => {
            return { open: prevState.open === email.id ? -1 : email.id };
        });
    };

    return (
        <List component="nav" sx={{ width: '100%', padding: 0, borderTop: '1px solid #bbb' }}>
            {selectedEmailList.map((email) => (
                <ListItemButton key={email.id} 
                    className={styles.emailBox  + ' ' + ((selectedEmail.id===email.id || selectedEmail.parentId===email.id) ? styles.active : '')}
                    onClick={handleToggleClick.bind(null, email)}
                    sx={{ display: 'inline-block', width: '100%'}}
                >
                    <ListItemAvatar className={styles.avatarWrapper} style={{ paddingLeft: email.type==='group' ? 4 : 28 }}>
                        <Avatar style={{ backgroundColor: `${email.color}` }}>
                            {createInitials(email)}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={getDisplayName(email)} 
                        sx={{ display: 'inline-block', pl:0 }}
                        secondary={
                            <Fragment>
                                <Typography 
                                    sx={{ display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {email.subject.length <= 40 ? email.subject : (email.subject.substr(0, 40) + "...")}
                                </Typography>
                                <span style={{ display: 'block' }}>
                                    {email.description.length <= 40 ? email.description : (email.description.substr(0, 40) + "...")}
                                </span>
                            </Fragment>
                        } 
                    />
                    {email.type==='group' ? 
                        <span className={styles.collapseWrapper}>
                            {openMail.open===email.id ? <ExpandLess onClick={(e) => collapse(e, email)} /> : <ExpandMore />}
                        </span> : ''
                    }
                    <span className={styles.deleteWrapper}>
                        <DeleteOutlined sx={{ color:'#666' }} onClick={() => deleteEmail(email.id)} />
                    </span>
                    {email.type==='group' &&
                        <Collapse in={openMail.open===email.id} timeout="auto" unmountOnExit>
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
                                                        color="text.secondary"
                                                    >
                                                        {reply.description.length <= 40 ? reply.description : (reply.description.substr(0, 40) + "...")}
                                                        {!reply.description && (reply.subject.length <= 40 ? reply.subject : (reply.subject.substr(0, 40) + "..."))}
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