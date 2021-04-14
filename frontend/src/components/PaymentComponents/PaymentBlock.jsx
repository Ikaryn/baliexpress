import { Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Typography } from '@material-ui/core';
import React from 'react';
import VisaLogo from '../../assets/Visa.png'
import MasterCardLogo from '../../assets/Mastercard.png'

const PaymentBlock = ({payment, errors, setPaymentDetails}) => {
    
    const handleChange = (key, value) => {
        const newPaymentDetails = JSON.parse(JSON.stringify(payment));
        newPaymentDetails[key] = value;
        setPaymentDetails(newPaymentDetails);
    }
    
    return (
        <Grid container direction="column" spacing={3} className="light-text">
            <Paper variant="outlined">
                <Grid item>
                    <Typography variant="h4">Payment Method</Typography>
                </Grid>
                <Grid container item direction="row" xs={12}>
                    <Grid item xs={5}>
                        <FormControlLabel
                            control={<Checkbox checked={true} />}
                            label="Credit Card"
                            />
                    </Grid>
                    <Grid container item direction="row" xs={7}>
                        <Grid item>
                            <img src={VisaLogo} alt="visa logo" />
                        </Grid>
                        <Grid item>
                            <img src={MasterCardLogo} alt="Mastercard logo" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.type === '' ? false : true}>
                        <InputLabel>Credit Card Type</InputLabel>
                        <Select
                            fullWidth
                            value={payment.type}
                            onChange={(event) => {handleChange('type', event.target.value)}}
                            >
                            <MenuItem value="" />
                            <MenuItem value="visa">Visa</MenuItem>
                            <MenuItem value="mastercard">Mastercard</MenuItem>
                        </Select>
                        <FormHelperText>{errors.type}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl error={errors.number === '' ? false : true}>
                        <InputLabel>Credit Card Number</InputLabel>
                        <OutlinedInput 
                            placeholder='' 
                            value={payment.number}
                            onChange={(event) => {handleChange('number', event.target.value)}} 
                            />
                        <FormHelperText>{errors.number}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container item direction="row">
                    <Grid item xs={3}>
                        <FormControl>
                            <InputLabel>Expiry Date</InputLabel>
                            {/* <ExpiryDateInput 
                                onChange={date => {handleCardDetailsChange('date', date)}}
                                value={ccDetails.date}
                                disabled={false}
                            /> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl error={errors.cvn === '' ? false : true}>
                            <InputLabel>Card Validation Number</InputLabel>
                            <OutlinedInput 
                                placeholder=""
                                value={payment.cvn}
                                onChange={(event) => {handleChange('cvn', event.target.value)}}
                                />
                            <FormHelperText>{errors.cvn}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}

export default PaymentBlock;