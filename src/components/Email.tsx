import { Box, IconButton, Tooltip } from "@mui/material";
import { useOutlookContext } from "../providers/OutlookProvider";
import { Reply, ReplyAll } from '@mui/icons-material';

const Email = () => {
    const { selectedEmail, handleReply, setOpenEmailMode } = useOutlookContext();
    const createReplys = (type: string) => {
        handleReply(type);
        setOpenEmailMode(true);
    };

    return (
        <Box p={3}>
            <Box sx={{ float:'right', mt:1, color:'#444', cursor:'pointer' }}>
                <Tooltip title="Reply"><IconButton onClick={createReplys.bind(null, 'reply')}>
                    <Reply sx={{ mx:1 }} />
                </IconButton></Tooltip>
                <Tooltip title="Reply all"><IconButton onClick={createReplys.bind(null, 'replyAll')}>
                    <ReplyAll sx={{ mx:1 }} />
                </IconButton></Tooltip>
            </Box>
            <h3>
                {(selectedEmail.type==='reply' ? 'Re: ' : '') + selectedEmail.subject}
            </h3>
            <p><b>{selectedEmail.senderName ?? selectedEmail.from}</b></p>
            <p><b>To: </b>{selectedEmail.to?.join('; ')}</p>
            <hr></hr>
            <p style={{ paddingTop: '20px', whiteSpace: 'pre-wrap' }}>{selectedEmail.description}</p>
        </Box>
    );
};

export default Email;