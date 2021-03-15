import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import ProfilePageAccountInfo from '../components/ProfilePageAccountInfo';
import API from '../util/API';
import '../components/styles/profilePage.css'
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
                phone: userDetails.phone}
            const userShippingInfo = {addr: userDetails.streetAddress, 
                state: userDetails.state, 
                city: userDetails.city, 
                pCode: userDetails.postcode, 
                country: userDetails.country};
            setShippingInfo(userShippingInfo);
            setAccInfo(userAccInfo);
        })();
    },[]);


    return (
            <div className="profile-page-container">
                <Paper>
                    <Grid container direction="column" className="button-tab">
                        <Button 
                            className="acc-button" 
                            size="large" 
                            variant="contained" 
                            fullWidth>Profile</Button>
                        <Button 
                            className="acc-button" 
                            size="large" 
                            variant="contained" 
                            fullWidth>My Orders</Button>
                        <Button 
                            className="acc-button" 
                            size="large" 
                            variant="contained" 
                            fullWidth>My Builds</Button>
                        <Button 
                            className="acc-button" 
                            color="secondary" 
                            onClick={() => handleLogout()}>Logout</Button>
                    </Grid>
                </Paper>
                <Grid container direction="column">
                   <ProfilePageAccountInfo
                    accInfo={accInfo}
                    shippingInfo={shippingInfo}
                   />
                </Grid>
            </div>
    
    )

}

export default ProfilePage;