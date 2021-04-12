import { Grid } from '@material-ui/core';
import React from 'react';
import PaymentBlock from '../components/PaymentComponents/PaymentBlock';
import API from '../util/API';

const api = new API();

const PaymentPage = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const userId = localStorage.getItem('UserId');
        if (userId) {
            const response = api.get(`/profile?userId=${userId}`);
            setUser(response.accountInfo);
        }
    },[]);

    return (
        <Grid>
            <PaymentBlock />
        </Grid>
    )
}

export default PaymentPage;