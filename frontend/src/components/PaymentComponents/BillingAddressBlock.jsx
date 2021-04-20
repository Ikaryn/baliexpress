import { Checkbox, FormControl, Grid, Input, FormHelperText, makeStyles, Paper, Typography, FormControlLabel } from '@material-ui/core';
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

const BillingAddressBlock = ({shipping, billing, errors, sameBilling, setBillingDetails, setSameBilling, shipped}) => {

    const classes = useStyles();
    const [sameAsShipping, setSameAsShipping] = React.useState(sameBilling);

    const handleChange = (key, value) => {
        const newBillingDetails = JSON.parse(JSON.stringify(billing));
        newBillingDetails[key] = value;
        setBillingDetails(newBillingDetails);
    }

    const handleCheckboxChange = () => {
        
        let sameAddress = !sameAsShipping;
        if (sameAddress) {
            setBillingDetails(shipping);
        }
        setSameAsShipping(sameAddress);
        setSameBilling(sameAddress);

    }

    React.useEffect(() => {
        if (!shipped) setSameAsShipping(false);
    })

    return (

        <Grid container direction="column" className="light-text">
            <Paper variant="outlined">
                <Grid item className={classes.title}>
                    <Typography variant="h4">Billing Address</Typography>
                </Grid>
                <Grid item container direction="column" className={`${classes.address} ${sameAsShipping && classes.disabled}`}>
                    <Grid item>
                        <Typography>Address</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl error={errors.address === '' ? false : true} fullWidth disabled={sameAsShipping}>
                            <Input value={billing.address} onChange={(event) => {handleChange('address', event.target.value)}}/>
                            <FormHelperText>{errors.address}</FormHelperText>
                        </FormControl> 
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={12} className={sameAsShipping && classes.disabled}>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>City</Typography>
                        <FormControl error={errors.city === '' ? false : true} disabled={sameAsShipping}>
                            <Input value={billing.city} onChange={(event) => {handleChange('city', event.target.value)}} />
                            <FormHelperText>{errors.city}</FormHelperText>
                        </FormControl> 
                    </Grid>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>Postcode</Typography>
                        <FormControl error={errors.postcode === '' ? false : true} disabled={sameAsShipping}>
                            <Input value={billing.postcode} onChange={(event) => {handleChange('postcode', event.target.value)}} />
                            <FormHelperText>{errors.postcode}</FormHelperText>
                        </FormControl> 
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={12} className={sameAsShipping && classes.disabled}>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>State</Typography>
                        <FormControl error={errors.state === '' ? false : true} disabled={sameAsShipping}>
                            <Input value={billing.state} onChange={(event) => {handleChange('state', event.target.value)}} />
                            <FormHelperText>{errors.state}</FormHelperText>
                        </FormControl> 
                    </Grid>
                    <Grid item className={classes.field} xs={4}>
                        <Typography>Country</Typography>
                        <FormControl error={errors.country === '' ? false : true} disabled={sameAsShipping}>
                            <Input value={billing.country} onChange={(event) => {handleChange('country', event.target.value)}} />
                            <FormHelperText>{errors.country}</FormHelperText>
                        </FormControl> 
                    </Grid>
                </Grid>
                {shipped &&
                    <Grid item className={classes.field}>
                        <FormControl>
                            <FormControlLabel
                                label="Same as Shipping Address"
                                control={<Checkbox checked={sameAsShipping} onChange={() => handleCheckboxChange()}/>}
                            />
                        </FormControl>
                    </Grid>
                }
            </Paper>
        </Grid>
    )
}

export default BillingAddressBlock;