import { Grid, Button } from '@material-ui/core';
import React from 'react';
import AccInfoblock from './AccInfoBlock';


const ProfilePageAccountInfo = ({accInfo, shippingInfo}) => {
    
    const [editComponent, setEditComponent] = React.useState(false);
    
    const handleEditDetails = () => {
        setEditComponent(true);
    };

    
    console.log(accInfo)
    return (
        <Grid container item direction="column" className="information-tab">
            <AccInfoblock 
                editComponent={editComponent}
                accInfo={accInfo}
                shippingInfo={shippingInfo}
                setEditComponent={setEditComponent}
            />
            <Grid container item direciton="row">
                <Grid item>
                    <Button variant="contained" >Change Password</Button>
                </Grid> 
                <Grid item>
                    <Button variant="contained" onClick={()=> handleEditDetails()}>Edit Details</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProfilePageAccountInfo;