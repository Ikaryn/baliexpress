import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@material-ui/core';
import React from 'react';
import VisaLogo from '../../assets/Visa.png'
import MasterCardLogo from '../../assets/Mastercard.png'
import ExpiryDateInput from "credit-card-expiry-date";

const PaymentBlock = () => {

    const [cardType, setCardType] = React.useState('');
    const [ccDetails, setCCDetails] = React.useState({'number': '', 'date':'', 'cvn':''});
    const [error, setError] = React.useState({'numberError':'', 'dateError':'', 'cvnError':''})
    
    const errorHandler = () => {
        let error = false;
        const newError = JSON.parse(JSON.stringify(error));
        
        if (String(ccDetails.number).length !== 16) {
            newError.numberError = "Credit Card Number Invalid"
            error = true;
        }
        if (ccDetails.number === '') {
            newError.numberError = "Credit Card Number cannot be empty";
            error = true;
        }
        
        const today = new Date();
        const year = today.getYear();
        const month = today.getMonth() + 1;
        
        if (String(ccDetails.cvn).length !== 3) {
            newError.cvnError = "CVV is invalid";
            error = true;
        }
        
        return error;
    }
    
    const handleCardDetailsChange = (type, value) => {
        const newCCDetails = JSON.parse(JSON.stringify(ccDetails));
        newCCDetails[type] = value;
        setCCDetails(newCCDetails);
    }
    
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h3">Payment Method</Typography>
            </Grid>
            <Grid container item direction="row">
                <Grid item>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="Credit Card"
                    />
                </Grid>
                <Grid container item direction="row">
                    <Grid item>
                        <img src={VisaLogo} alt="visa logo" />
                    </Grid>
                    <Grid item>
                        <img src={MasterCardLogo} alt="Mastercard logo" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <FormControl>
                    <InputLabel>Credit Card Type</InputLabel>
                    <Select
                        value={cardType}
                        onChange={(event) => {setCardType(event.target.value)}}
                    >
                        <MenuItem value="" />
                        <MenuItem value="visa">Visa</MenuItem>
                        <MenuItem value="mastercard">Mastercard</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl>
                    <InputLabel>Credit Card Number</InputLabel>
                    <OutlinedInput 
                        placeholder='' 
                        value={ccDetails.number}
                        onChange={(event) => {handleCardDetailsChange('number', event.target.value)}} 
                    />
                </FormControl>
            </Grid>
            <Grid container item direction="row">
                <Grid item>
                    <FormControl>
                        <InputLabel>Expiry Date</InputLabel>
                        {/* <ExpiryDateInput 
                            onChange={date => {handleCardDetailsChange('date', date)}}
                            value={ccDetails.date}
                            disabled={false}
                        /> */}
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>Card Validation Number</InputLabel>
                        <OutlinedInput 
                            placeholder=""
                            value={ccDetails.cvn}
                            onChange={(event) => {handleCardDetailsChange('cvn', event.target.value)}}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default PaymentBlock;