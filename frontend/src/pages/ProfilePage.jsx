import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import AccInfoblock from '../components/AccInfoBlock';
import ProfilePageAccountInfo from '../components/ProfilePageAccountInfo';
import API from '../util/API';
import { StoreContext } from '../util/store';
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
        history.push('');
    }
    
    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const userDetails = await api.get(`user/${userId}`,{userId: userId});
            console.log(userDetails);
            
        })();
    },[]);


    return (
            <div className="profile-page-container">
                <Paper>
                    <Grid container direction="column" sm={2}>
                        <Button>Profile</Button>
                        <Button>My Orders</Button>
                        <Button>My Builds</Button>
                        <Button color="secondary" onClick={() => handleLogout()}>Logout</Button>
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