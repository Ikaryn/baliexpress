import { Grid, Button } from '@material-ui/core';
import React from 'react';
import AccInfoblock from './AccInfoBlock';
import ShippingInfoblock from './ShippingInfoBlock';


const ProfilePageAccountInfo = ({accInfo, shippingInfo}) => {
    <Grid container item direciton="column" >
        <Grid container item direction="column">
            <AccInfoblock 
                name={accInfo.name}
                email={accInfo.email}
                phone={accInfo.phone}
            />
            <Grid item>
                <Button>Change Password</Button>
            </Grid> 
            <ShippingInfoblock
                addr={shippingInfo.addr}
                city={shippingInfo.city}
                pCode={shippingInfo.pCode}
                country={shippingInfo.country}
            />
        </Grid>
    </Grid>

}

export default ProfilePageAccountInfo;