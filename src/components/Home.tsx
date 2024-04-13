import { Grid } from "@mui/material";
import EmailTypes from "./EmailTypes";
import EmailList from "./EmailList";
import styles from "./Home.module.css";
import Email from "./Email";
import { useOutlookContext } from "../providers/OutlookProvider";
import MainActionButtons from "./MainActionButtons";
import CreateNewEmail from "./CreateNewEmail";

const Home = () => {
    const { selectedType, openEmailMode } = useOutlookContext();

    return (
        <Grid container my={0} sx={{ height: '100%' }}>
            <Grid container item md={5} className={styles.innerGrid} sx={{ borderTop:0 }}>
                <MainActionButtons />
                
                <Grid item md={5} className={styles.innerGrid}>
                    <h3>ankit@gupta.com</h3>
                    <EmailTypes />
                </Grid>
                <Grid item md={7} className={styles.innerGrid} sx={{ borderRight:0 }}>
                    <h2>{selectedType}</h2>
                    <EmailList />
                </Grid>
            </Grid>
            <Grid item md={7} sx={{ height: '100%' }}>
                { openEmailMode ? <CreateNewEmail /> : <Email /> }
            </Grid>
        </Grid>
    );
};

export default Home;