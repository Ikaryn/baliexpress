import { Checkbox, FormControl, FormLabel, FormControlLabel, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';
import VisaLogo from '../../assets/Visa.png'
import MasterCardLogo from '../../assets/Mastercard.png'

const useStyles = makeStyles(() => ({

    slash: {
        'padding-left': '0.5em',
        'padding-right': '0.5em',
    },

    input: {
        'padding': '0.5em',
    },

    date: {
        'margin-left': '10em',
    },

    title: {
        'padding': '0.5em',
    }

}))

const PaymentBlock = ({payment, errors, setPaymentDetails}) => {

    const classes = useStyles();
    
    const handleChange = (key, value) => {
        const newPaymentDetails = JSON.parse(JSON.stringify(payment));
        newPaymentDetails[key] = value;
        setPaymentDetails(newPaymentDetails);
    }

    let months = [];
    for (let i = 1; i <= 12; i++) {
        if (i / 10 >= 1) {
            months.push(<MenuItem value={i}>{i}</MenuItem>);
        } else {
            months.push(<MenuItem value={i}>0{i}</MenuItem>);
        }
    }

    let years = [];
    for (let j = 21; j <= 30; j++) {
        years.push(<MenuItem value={j}>20{j}</MenuItem>);
    }
    
    return (
        <Grid container direction="column" className="light-text" xs={12}>
            <Paper variant="outlined">
                <Grid item className={classes.title}>
                    <Typography variant="h4">Payment Method</Typography>
                </Grid>
                <Grid container item direction="row" xs={11} className={classes.input} justify="space-between">
                    <Grid item xs={3}>
                        <FormControl error={errors.type === '' ? false : true} fullWidth>
                            <InputLabel>Credit Card Type</InputLabel>
                            <Select
                                fullWidth
                                value={payment.type}
                                onChange={(event) => {handleChange('type', event.target.value)}}
                                >
                                <MenuItem value="Visa">Visa</MenuItem>
                                <MenuItem value="Mastercard">Mastercard</MenuItem>
                            </Select>
                            <FormHelperText>{errors.type}</FormHelperText>
                        </FormControl>
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
                <Grid item className={classes.input}>
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
                <Grid container item direction="row" className={classes.input}>
                    <Grid item xs={3}>
                        <FormControl error={errors.cvn === '' ? false : true}>
                            <InputLabel>CVV</InputLabel>
                            <OutlinedInput 
                                placeholder=""
                                value={payment.cvn}
                                onChange={(event) => {handleChange('cvn', event.target.value)}}
                                />
                            <FormHelperText>{errors.cvn}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} direction="row" className={classes.date}>
                        <FormControl error={errors.date === '' ? false : true}>
                            <FormLabel>Expiry Date</FormLabel>
                            <Grid container direction="row">
                                <Grid item>
                                    <Select
                                        value={payment.month}
                                        onChange={(event) => {handleChange('month', event.target.value)}}
                                        >
                                        {months}
                                        {/* <MenuItem value={1}>One</MenuItem>
                                        <MenuItem value={2}>Two</MenuItem>
                                        <MenuItem value={3}>Three</MenuItem>
                                        <MenuItem value={4}>Four</MenuItem>
                                        <MenuItem value={1}>Five</MenuItem>
                                        <MenuItem value={1}>Six</MenuItem>
                                        <MenuItem value={1}>Seven</MenuItem>
                                        <MenuItem value={1}>Eight</MenuItem>
                                        <MenuItem value={1}>Nine</MenuItem>
                                        <MenuItem value={1}>Ten</MenuItem>
                                        <MenuItem value={1}>Eleven</MenuItem>
                                        <MenuItem value={1}>Twelve</MenuItem> */}

                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" className={classes.slash}>/</Typography>
                                </Grid>
                                <Grid item>
                                    <Select
                                        value={payment.year}
                                        onChange={(event) => {handleChange('year', event.target.value)}}
                                        >
                                        {years}
                                        {/* <MenuItem value={1}>Twenty One</MenuItem>
                                        <MenuItem value={2}>Twenty Two</MenuItem>
                                        <MenuItem value={3}>Twenty Three</MenuItem>
                                        <MenuItem value={4}>Twenty Four</MenuItem>
                                        <MenuItem value={1}>Twenty Five</MenuItem>
                                        <MenuItem value={1}>Twenty Six</MenuItem>
                                        <MenuItem value={1}>Twenty Seven</MenuItem>
                                        <MenuItem value={1}>Twenty Eight</MenuItem>
                                        <MenuItem value={1}>Twenty Nine</MenuItem>
                                        <MenuItem value={1}>Thirty</MenuItem>
                                        <MenuItem value={1}>Thirty One</MenuItem>
                                        <MenuItem value={1}>Thirty Two</MenuItem> */}

                                    </Select>
                                </Grid>

                            </Grid>
                            <FormHelperText>{errors.date}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}

export default PaymentBlock;