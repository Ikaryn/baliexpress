import { FormControl, Grid, Input, FormHelperText, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(() => ({

    field: {
        'padding': '0.5em'
    },

    address: {
        'width': '100%',
        'padding': '0.5em'
    },

    title: {
        'padding': '0.5em'
    },

    disabled: {
        'opacity': '0.7'
    }

}))

const ShippingBlock = ({shipping, errors, setShippingDetails, sameBilling, setBillingDetails, shipped}) => {

    const classes = useStyles();

    const handleChange = (key, value) => {
        const newShippingDetails = JSON.parse(JSON.stringify(shipping));
        newShippingDetails[key] = value;
        setShippingDetails(newShippingDetails);
        if (sameBilling) setBillingDetails(newShippingDetails);
    }

    return (
        <Grid container direction="column" className="light-text">
            <Paper variant="outlined">
                <Grid item className={classes.title}>
                    <Typography variant="h4">Shipping Information</Typography>
                </Grid>
                <Grid item container direction="column" className={classes.address}>
                    <Grid item>
                        <Typography>Address</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl error={errors.address === '' ? false : true} fullWidth>
                            <Input value={shipping.address} onChange={(event) => {handleChange('address', event.target.value)}}/>
                            <FormHelperText>{errors.address}</FormHelperText>
                        </FormControl> 
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={12}>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>City</Typography>
                        <FormControl error={errors.city === '' ? false : true}>
                            <Input value={shipping.city} onChange={(event) => {handleChange('city', event.target.value)}} />
                            <FormHelperText>{errors.city}</FormHelperText>
                        </FormControl> 
                    </Grid>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>Postcode</Typography>
                        <FormControl error={errors.postcode === '' ? false : true}>
                            <Input value={shipping.postcode} onChange={(event) => {handleChange('postcode', event.target.value)}} />
                            <FormHelperText>{errors.postcode}</FormHelperText>
                        </FormControl> 
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={12}>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>State</Typography>
                        <FormControl error={errors.state === '' ? false : true}>
                            <Input value={shipping.state} onChange={(event) => {handleChange('state', event.target.value)}} />
                            <FormHelperText>{errors.state}</FormHelperText>
                        </FormControl> 
                    </Grid>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>Country</Typography>
                        <FormControl error={errors.country === '' ? false : true}>
                            <Input value={shipping.country} onChange={(event) => {handleChange('country', event.target.value)}} />
                            <FormHelperText>{errors.country}</FormHelperText>
                        </FormControl> 
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ShippingBlock;