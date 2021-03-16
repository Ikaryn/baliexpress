import { Button, Grid, Paper, Typography, Tab, Tabs, Box, AppBar } from '@material-ui/core';
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

    const [component, setComponent] = React.useState();
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const [accInfo, setAccInfo] = React.useState({
        name: '', email: '', phone: ''
    });
    const [shippingInfo, setShippingInfo] = React.useState({
        addr: '', city: '', state:'', pCode: '', country: ''
    });
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }
    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const response = await api.get(`profile/${userId}?userId=${userId}`);
            const userDetails = response.accountInfo.userInfo;
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
        <div className="root profile-page-container">
            <Paper>
                <Grid container direction="column" className={classes.root}>
                    <Tabs 
                        value={value} onChange={handleChange} 
                        aria-label="profile-tabs"
                        orientation="horizontal"
                        className={classes.tabs}
                    >
                        <Tab label="Profile" />
                        <Tab label="My Orders" />
                        <Tab label="My Builds" />
                        {accInfo.isAdmin && <Tab label="Add Product" />}
                        {accInfo.isAdmin && <Tab label="View Users" />}                        
                        <Tab label="Logout" />
                    </Tabs>
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
            </Paper>
        </div>
    
    )

}

export default ProfilePage;