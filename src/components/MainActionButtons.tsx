import { Box, Button, Grid } from "@mui/material";
import { Email as EmailIcon, Delete } from '@mui/icons-material';
import { useOutlookContext } from "../providers/OutlookProvider";

const MainActionButtons = () => {
    const { setOpenEmailMode } = useOutlookContext();
    return (
        <Grid container item md={12}>
            <Grid item md={5}>
                <Box textAlign="center" sx={{ pt:2, pb:2 }}>
                    <Button variant="contained" size="medium" 
                        startIcon={<EmailIcon />}
                        onClick={() => setOpenEmailMode(true)}
                    >
                        New Email
                    </Button>
                </Box>
            </Grid>
            <Grid item md={7}>
                <Box sx={{ padding: '16px' }}>
                    <Button variant="outlined" startIcon={<Delete />}>
                        Delete
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default MainActionButtons;