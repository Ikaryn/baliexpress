import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import React from 'react';
import PaymentBlock from '../components/PaymentComponents/PaymentBlock';
import ShippingBlock from '../components/PaymentComponents/ShippingBlock';
import API from '../util/API';
import { convertCategoryName } from '../util/helpers';

const api = new API();

const PaymentPage = () => {

    const history = useHistory();
    const [user, setUser] = React.useState(null);
    const [paymentDetails, setPaymentDetails] = React.useState({'type': '', 'number': '', 'date':'', 'cvn':''});
    const [paymentErrors, setPaymentErrors] = React.useState({'type': '', 'number': '', 'date':'', 'cvn':''});
    const [shippingDetails, setShippingDetails] = React.useState({  'address': '', 
                                                                    'city': '',
                                                                    'postcode': '',
                                                                    'state': '',
                                                                    'country': ''});
    const [shippingErrors, setShippingErrors] = React.useState({'address': '', 
                                                                'city': '',
                                                                'postcode': '',
                                                                'state': '',
                                                                'country': ''});

    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await api.get(`profile?userId=${userId}`);
                const account = response.accountInfo;
                setUser(account);
                console.log(user);
                const newShippingDetails = JSON.parse(JSON.stringify(shippingDetails));
                newShippingDetails['address'] = account.streetaddress;
                newShippingDetails['city'] = account.city;
                newShippingDetails['postcode'] = account.postcode;
                newShippingDetails['state'] = account.state;
                newShippingDetails['country'] = account.country;
                setShippingDetails(newShippingDetails);
            }
        })();
    },[]);
    
    function checkInputNumber (input) {
        return /^[1-9]\d*$/.test(input);
    }

    function checkInputAlpha (input) {
        return /^[a-zA-Z ]+$/.test(input);
    }

    const checkErrors = () => {

        console.log("Checking for errors...")
        console.log("Shipping Info:", shippingDetails);
        console.log("Payment Info:", paymentDetails);

        const newShippingErrors = JSON.parse(JSON.stringify(shippingErrors));
        let error = false;

        Object.keys(shippingDetails).forEach(field => {
            if (shippingDetails[field] === '') {
                newShippingErrors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' cannot be empty';
                error = true;
            } else if (field === 'city' || field === 'state' || field === 'country'){
                if (!checkInputAlpha(shippingDetails[field])) {
                    newShippingErrors[field] = 'Invalid ' + field;
                    error = true;
                };
            } else if (field === 'postcode') {
                if (!checkInputNumber(shippingDetails[field])) {
                    newShippingErrors[field] = 'Invalid ' + field;
                    error = true;
                };
            };
        });

        const newPaymentErrors = JSON.parse(JSON.stringify(paymentErrors));

        if (paymentDetails.type === '') {
            newPaymentErrors['type'] = "Please select your card type";
            error = true;
        }

        if (paymentDetails.number === '') {
            newPaymentErrors['number'] = "Credit Card Number cannot be empty";
            error = true;
        } else if (String(paymentDetails.number).length !== 16) {
            newPaymentErrors['number'] = "Credit Card Number Invalid"
            error = true;
        }
        
        const today = new Date();
        const year = today.getYear();
        const month = today.getMonth() + 1;
        
        if (String(paymentDetails.cvn).length !== 3) {
            newPaymentErrors['cvn'] = "CVV is invalid";
            error = true;
        }

        if (error) {
            setShippingErrors(newShippingErrors);
            setPaymentErrors(newPaymentErrors);
            return false; 
        };

        return true;
    }

    const handleSubmit = async () => {

        const newShippingErrors = JSON.parse(JSON.stringify(shippingErrors));
        Object.keys(shippingErrors).forEach(field => newShippingErrors[field]='');
        setShippingErrors(newShippingErrors);
        
        const newPaymentErrors = JSON.parse(JSON.stringify(paymentErrors));
        Object.keys(paymentErrors).forEach(field => newPaymentErrors[field]='');
        setPaymentErrors(newPaymentErrors);

        if (!checkErrors()) {
            console.log('There was an error');
        } else {
            console.log('No errors were found');
            const products = {};
            const cart = localStorage.getItem('cart');
            cart.forEach(product => products[product.id] = product.quantity);

            const body = {
                userId: localStorage.getItem('userId'),
                products: products
            };

            const response = await api.post(`order`, body);
            console.log(response);
            if (response) history.push(`order?orderId=${response.orderId}`);

        }
    }

    return (
        <Grid container direction="column">   
            <Grid item>
                {user && <ShippingBlock 
                                        shipping={shippingDetails} 
                                        errors={shippingErrors}
                                        setShippingDetails={setShippingDetails}/>}
            </Grid>
            <Grid item>
                <PaymentBlock   payment={paymentDetails}
                                errors={paymentErrors}
                                setPaymentDetails={setPaymentDetails}/>
            </Grid>
            <Grid item>
                <Button
                    color="primary" 
                    variant="contained"
                    onClick={() => handleSubmit()}
                >
                    Submit here
                </Button>
            </Grid>
        </Grid>
    )
}

export default PaymentPage;