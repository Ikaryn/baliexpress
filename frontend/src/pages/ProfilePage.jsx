import { Button, Grid, Paper, Typography, Tab, Tabs, Box, AppBar, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import ProfilePageAccountInfo from '../components/ProfilePageAccountInfo';
import AddProduct from '../components/AddProduct';
import ViewUsers from '../components/ViewUsers';
import API from '../util/API';
import { makeStyles } from '@material-ui/core/styles';
import '../components/styles/profilePage.css';
// import './App.css';
const api = new API();

const pageStatus = {
    ACCINFO: 'accInfo',
    ORDERS: 'orders',
    BUILDS: 'builds'
}

const ProfilePage = () => {

    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const [accInfo, setAccInfo] = React.useState({
        name: '', email: '', phone: ''
    });
    const [shippingInfo, setShippingInfo] = React.useState({
        addr: '', city: '', state:'', pCode: '', country: ''
    });
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }
    
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    }
    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const response = await api.get(`profile/${userId}?userId=${userId}`);
            const userDetails = response.accountInfo;
            console.log('RESPONSE', response);
            const userAccInfo = {name: userDetails.name, 
                email: userDetails.email, 
                phone: userDetails.phone,
                isAdmin: userDetails.admin}
            const userShippingInfo = {addr: userDetails.streetAddress, 
                state: userDetails.state, 
                city: userDetails.city, 
                pCode: userDetails.postcode, 
                country: userDetails.country};
            setShippingInfo(userShippingInfo);
            setAccInfo(userAccInfo);
        })();
    },[]);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
      
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          height: '100%',
        },
        tabs: {
          borderRight: `1px solid ${theme.palette.divider}`,
        },
    }));
    const classes = useStyles();

    return(
            <div className="root">
                <Paper className="profile-page-container">
                    <Grid container >
                        <Grid item xs={3}>
                            <Tabs 
                                value={value} onChange={handleChange} 
                                aria-label="profile-tabs"
                                orientation="vertical"
                                className={classes.tabs}
                                >
                                <Tab label="Profile" />
                                <Tab label="My Orders" />
                                <Tab label="My Builds" />
                                {accInfo.isAdmin && <Tab label="Add Product" />}
                                {accInfo.isAdmin && <Tab label="View Users" />}     
                                <Tab label="Logout" />
                            </Tabs>
                        </Grid>
                        <Grid item xs={9}>
                            <TabPanel value={value} index={0}>
                                <ProfilePageAccountInfo
                                    accInfo={accInfo}
                                    shippingInfo={shippingInfo}
                                    />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                My Orders
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                My Builds
                            </TabPanel>      
                            {accInfo.isAdmin && 
                                <TabPanel value={value} index={3}>
                                    <AddProduct/>
                                </TabPanel>   
                            }
                            {accInfo.isAdmin &&                     
                                <TabPanel value={value} index={4}>
                                    <ViewUsers/>
                                </TabPanel>
                            }
                            <TabPanel value={value} index={accInfo.isAdmin ? 5 : 3}>
                                Logout
                            </TabPanel>                        
                        </Grid>
                    </Grid>
                </Paper>
                <Modal open={open} onClick={handleOpen}>
                    <Grid className="logout-confirmation-container">
                        <Typography>Are you sure you want to logout?</Typography>
                        <Grid item container direction="row" justify="center">
                            <Grid item>
                                <Button variant="contained" onClick={() => handleOpen()}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => handleLogout()}>Confirm</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
    
    )

}

export default ProfilePage;