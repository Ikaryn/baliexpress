import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import AccInfoblock from '../components/AccInfoBlock';
import ProfilePageAccountInfo from '../components/ProfilePageAccountInfo';
import API from '../util/API';
import { StoreContext } from '../util/store';

const api = new API();

const pageStatus = {
    ACCINFO: 'accInfo',
    ORDERS: 'orders',
    BUILDS: 'builds'
}

const ProfilePage = () => {

    const context = React.useContext(StoreContext);
    const {userId : [userId]} = context;
    const [component, setComponent] = React.useState()
    
    
    const [accInfo, setAccInfo] = React.useState({
        name: '', email: '', phone: ''
    });
    const [shippingInfo, setShippingInfo] = React.useState({
        addr: '', city: '', state:'', pCode: '', country: ''
    });
    
    React.useEffect(() => {
        (async () => {
            const userDetails = await api.get(`user/${userId}`);
        })();
    },[userId]);


    return (
            <Grid container direction="row">
                <Grid container item direction="column" sm={2}>
                    <Button>Profile</Button>
                    <Button>My Orders</Button>
                    <Button>My Builds</Button>
                    <Button color="secondary">Logout</Button>
                </Grid>
                <Grid container item direction="column">
                   <ProfilePageAccountInfo
                    accInfo={accInfo}
                    shippingInfo={shippingInfo}
                   />
                </Grid>
            </Grid>
    
    )

}

export default ProfilePage;