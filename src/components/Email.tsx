import { Box } from "@mui/material";
import { useOutlookContext } from "../providers/OutlookProvider";

const Email = () => {
    const { selectedEmail } = useOutlookContext();

    return (
        <Box p={3}>
            <h3>{(selectedEmail.type==='reply' ? 'Re: ' : '') + selectedEmail.subject}</h3>
            <p><b>{selectedEmail.senderName ?? selectedEmail.from}</b></p>
            <p><b>To: </b>{selectedEmail.to?.join('; ')}</p>
            <hr></hr>
            <p style={{ paddingTop: '20px', whiteSpace: 'pre-wrap' }}>{selectedEmail.description}</p>
        </Box>
    );
};

export default Email;