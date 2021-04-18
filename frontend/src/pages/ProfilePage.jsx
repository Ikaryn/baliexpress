import { Button, Grid, Paper, Typography, Tab, Tabs, Box, AppBar, Modal, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import ProfilePageAccountInfo from '../components/ProfilePageAccountInfo';
import AddProduct from '../components/AddProduct';
import ViewUsers from '../components/ViewUsers';
import API from '../util/API';
import { makeStyles } from '@material-ui/core/styles';
import '../components/styles/profilePage.css';
import AllProductList from '../components/AllProductList';
import UserBuildList from '../components/profilePage/UserBuildList';
import ReportedReviewsList from '../components/profilePage/ReportedReviewsList';
import UserOrderList from '../components/profilePage/UserOrderList';
import SalePanel from '../components/AdminManagementComponents/SalePanel';
import { StoreContext } from '../util/store';
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
        name: '', email: '', phonenumber: '', password: ''
    });
    const [shippingInfo, setShippingInfo] = React.useState({
        streetaddress: '', city: '', state:'', postcode: '', country: ''
    });
    const [open, setOpen] = React.useState(false);
    const context = React.useContext(StoreContext);
    const {userType: [,setUserType] } = context;
    
    // const [saleComponent, setSaleComponent] = React.useState('table');
    
    // when logout remove all of cookies
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        setUserType('guest')
        history.push('/');
    }
    
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    }
    
    //get all of the user details
    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Request-Type': 'profile',
                },
            }
            const response = await api.makeAPIRequest(`profile?userId=${userId}`, options);
            const userDetails = response.accountInfo;
            console.log('RESPONSE', response);
            const userAccInfo = {name: userDetails.name, 
                email: userDetails.email, 
                phonenumber: userDetails.phonenumber,
                password: userDetails.password,
                isAdmin: userDetails.admin}
            const userShippingInfo = {
                streetaddress: userDetails.streetaddress, 
                state: userDetails.state, 
                city: userDetails.city, 
                postcode: userDetails.postcode, 
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
                            {!accInfo.isAdmin && <Tab label="Profile" />}
                            {!accInfo.isAdmin && <Tab label="My Orders" />}
                            {!accInfo.isAdmin && <Tab label="My Builds" />}
                            {accInfo.isAdmin && <Tab label="Add Product" />}
                            {accInfo.isAdmin && <Tab label="View all Products" />}
                            {accInfo.isAdmin && <Tab label="View Users" />}     
                            {accInfo.isAdmin && <Tab label="Manage Sales" />}   
                            {accInfo.isAdmin && <Tab label="Reported Reviews" />} 
                            <Button color="secondary" onClick={handleOpen}>Logout</Button>
                        </Tabs>
                    </Grid>
                    <Grid item xs={9}>
                        {!accInfo.isAdmin &&
                            <TabPanel value={value} index={0}>
                                <ProfilePageAccountInfo
                                    accInfo={accInfo}
                                    shippingInfo={shippingInfo}
                                    />
                            </TabPanel>
                        }
                        {!accInfo.isAdmin &&
                            <TabPanel value={value} index={1}>
                                <UserOrderList />
                            </TabPanel>
                        }
                        {!accInfo.isAdmin &&
                            <TabPanel value={value} index={2}>
                                <UserBuildList />
                            </TabPanel>      
                        }
                        {accInfo.isAdmin && 
                            <TabPanel value={value} index={0}>
                                <AddProduct/>
                            </TabPanel>   
                        }
                        {accInfo.isAdmin &&
                            <TabPanel value={value} index={1}>
                                <AllProductList />
                            </TabPanel>
                        }
                        {accInfo.isAdmin &&                     
                            <TabPanel value={value} index={2}>
                                <ViewUsers/>
                            </TabPanel>
                        }
                        {accInfo.isAdmin &&                     
                            <TabPanel value={value} index={6}>
                                <SalePanel />
                            </TabPanel>
                        }
                        {accInfo.isAdmin &&
                            <TabPanel value={value} index={7}>
                                <ReportedReviewsList/>
                            </TabPanel>
                        }
                        <TabPanel value={value} index={accInfo.isAdmin ? 8 : 3}>
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
                            <Button color="primary" variant="contained" onClick={() => handleOpen()}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button color="secondary" variant="contained" onClick={() => handleLogout()}>Confirm</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    )

}

export default ProfilePage;