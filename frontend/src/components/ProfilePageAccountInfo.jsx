import { Grid, Button } from '@material-ui/core';
import React from 'react';
import AccInfoblock from './AccInfoBlock';
import ShippingInfoblock from './ShippingInfoBlock';


const ProfilePageAccountInfo = ({accInfo, shippingInfo}) => {
    
    const [editComponent, setEditComponent] = React.useState(false);
    
    const handleEditDetails = () => {
        setEditComponent(true);
    };
    
    return (<Grid container item direction="column">
        <AccInfoblock 
            editComponent={editComponent}
            name={accInfo.name}
            email={accInfo.email}
            phone={accInfo.phone}
            setEditComponent={setEditComponent}
        />
        <Grid item>
            <Button variant="contained" >Change Password</Button>
        </Grid> 
        {/* <ShippingInfoblock
            addr={shippingInfo.addr}
            city={shippingInfo.city}
            pCode={shippingInfo.pCode}
            country={shippingInfo.country}
        /> */}
        <Grid item>
            <Button variant="contained" onClick={()=> handleEditDetails()}>Edit Details</Button>
        </Grid>
    </Grid>
    )
}

export default ProfilePageAccountInfo;