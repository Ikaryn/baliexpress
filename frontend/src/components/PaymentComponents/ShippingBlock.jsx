import { FormControl, Grid, Input, FormHelperText, Typography } from '@material-ui/core';
import React from 'react'

const ShippingBlock = ({shipping, errors, setShippingDetails}) => {

    const handleChange = (key, value) => {
        const newShippingDetails = JSON.parse(JSON.stringify(shipping));
        newShippingDetails[key] = value;
        setShippingDetails(newShippingDetails);
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography>Address</Typography>
                <FormControl error={errors.address === '' ? false : true}>
                    <Input value={shipping.address} onChange={(event) => {handleChange('address', event.target.value)}} />
                    <FormHelperText>{errors.address}</FormHelperText>
                </FormControl> 
            </Grid>
            <Grid item container direction="row">
                <Grid item>
                    <Typography>City</Typography>
                    <FormControl error={errors.city === '' ? false : true}>
                        <Input value={shipping.city} onChange={(event) => {handleChange('city', event.target.value)}} />
                        <FormHelperText>{errors.city}</FormHelperText>
                    </FormControl> 
                </Grid>
                <Grid item>
                    <Typography>Postcode</Typography>
                    <FormControl error={errors.postcode === '' ? false : true}>
                        <Input value={shipping.postcode} onChange={(event) => {handleChange('postcode', event.target.value)}} />
                        <FormHelperText>{errors.postcode}</FormHelperText>
                    </FormControl> 
                </Grid>
            </Grid>
            <Grid item container direction="row">
                <Grid item>
                    <Typography>State</Typography>
                    <FormControl error={errors.state === '' ? false : true}>
                        <Input value={shipping.state} onChange={(event) => {handleChange('state', event.target.value)}} />
                        <FormHelperText>{errors.state}</FormHelperText>
                    </FormControl> 
                </Grid>
                <Grid item>
                    <Typography>Country</Typography>
                    <FormControl error={errors.country === '' ? false : true}>
                        <Input value={shipping.country} onChange={(event) => {handleChange('country', event.target.value)}} />
                        <FormHelperText>{errors.country}</FormHelperText>
                    </FormControl> 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ShippingBlock;