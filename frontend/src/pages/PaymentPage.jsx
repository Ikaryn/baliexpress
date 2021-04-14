import { Grid } from '@material-ui/core';
import React from 'react';
import PaymentBlock from '../components/PaymentComponents/PaymentBlock';
import ShippingBlock from '../components/PaymentComponents/ShippingBlock';
import API from '../util/API';
import { convertCategoryName } from '../util/helpers';

const api = new API();

const PaymentPage = () => {
    
    const [user, setUser] = React.useState(null);
    const [ccDetails, setCCDetails] = React.useState({'number': '', 'date':'', 'cvn':''});

    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await api.get(`profile?userId=${userId}`);
                setUser(response.accountInfo);
                console.log(user);
            }
        })();
    },[]);

    return (
        <Grid container direction="column">   
            <Grid item>
                {user && <ShippingBlock user={user}/>}
            </Grid>
            <Grid item>
                <PaymentBlock />
            </Grid>
        </Grid>
    )
}

export default PaymentPage;