import { Checkbox, FormControlLabel, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreIcon from '@material-ui/icons/Store';

const useStyles = makeStyles(() => ({
    title: {
        'padding': '0.5em',
    },
    deliveryContent: {
        padding: '0.5em',
        marginLeft: '1em',
    },
    checkboxContainers: {
        border: '1px solid white',
        marginRight: '20em',
    },
    deliveryOptionsContainer: {
        marginLeft: '0.75em',
        border: '1px solid white',
        width: '70%',
    },
    deliveryOptionsCheckbox: {
        marginLeft: '0.75em'
    },
    deliveryOptionsBlock: {
        marginBottom: '1em',
        marginTop: '0.5em'
    }
    
}));

const DeliveryBlock = ({setShippingPrice, setShipped, setSameBilling}) => {
    const [delivery, setDelivery] = React.useState({
        checkedDelivery: true,
        checkedPickup: false
    });
    
    const [deliveryOptions, setDeliveryOptions] = React.useState({
        statewide: false,
        interstate: false,
        international: false,
    })
    
    const handleChange = (value, type) => {
        const deliveryCheck = {checkedDelivery: false, checkedPickup: false};
        if(type === 'pickup') {
            deliveryCheck.checkedDelivery = false;
            deliveryCheck.checkedPickup = true;
            setShipped(false);
            setSameBilling(false);
            if (value) {
                deliveryCheck.checkedDelivery = true;
                deliveryCheck.checkedPickup = false;
            }
            setShippingPrice(0);
        } else {
            deliveryCheck.checkedDelivery = true;
            deliveryCheck.checkedPickup = false;
            setShipped(true);
            if (value) {
                deliveryCheck.checkedDelivery = false;
                deliveryCheck.checkedPickup = true;
            }
        }
        
        setDelivery(deliveryCheck);
    };
    
    const handleDeliveryType = (value, type) => {
        const deliveryOptionsTemp = {
            statewide: false,
            interstate: false,
            international: false,
        }
        if (type === 'statewide') {
            deliveryOptionsTemp.statewide = true;
            deliveryOptionsTemp.interstate = false;
            deliveryOptionsTemp.international = false;
            setShippingPrice(10);
        } else if (type === 'interstate') {
            deliveryOptionsTemp.statewide = false;
            deliveryOptionsTemp.interstate = true;
            deliveryOptionsTemp.international = false;
            setShippingPrice(15);
        } else {
            deliveryOptionsTemp.statewide = false;
            deliveryOptionsTemp.interstate = false;
            deliveryOptionsTemp.international = true;
            setShippingPrice(20);
        }
        
        setDeliveryOptions(deliveryOptionsTemp);
        
    }
    
    const classes = useStyles();
    
    return (
        <Grid container direction="column" className="light-text">
            <Paper variant="outlined">
                <Grid item className={classes.title} >
                    <Typography variant="h4">Delivery Options</Typography>
                </Grid>
                <Grid container direction="column" className={classes.deliveryContent}>
                    
                    <FormControlLabel 
                        className={classes.checkboxContainers}
                        control={
                            <Checkbox
                                checked={delivery.checkedDelivery}
                                onChange={(event) => handleChange(event.target.value, 'delivery')} name="checkedDelivery"
                                />
                            }
                        label={
                            <Grid container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <LocalShippingIcon/>
                                </Grid>
                                <Grid item>
                                    <Typography>Shipped</Typography>
                                </Grid>
                            </Grid>
                        }
                    />
                    
                    <FormControlLabel 
                        className={classes.checkboxContainers}
                        control={
                            <Checkbox
                                checked={delivery.checkedPickup}
                                onChange={(event) => handleChange(event.target.value, 'pickup')} name="checkedPickup"
                                />
                            }
                        label={
                            <Grid container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <StoreIcon/>
                                </Grid>
                                <Grid item>
                                    <Typography>Local Pick up</Typography>
                                </Grid>
                            </Grid>
                        }
                    />
                </Grid>
                {delivery.checkedDelivery && 
                    <Grid item container direction="column" className={classes.deliveryOptionsBlock}>
                        <Grid container item direction="row" className={classes.deliveryOptionsContainer} alignItems="center">
                            <Grid item className={classes.deliveryOptionsCheckbox}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox
                                        checked={deliveryOptions.statewide}
                                        onChange={(event) => handleDeliveryType(event.target.value, 'statewide')} 
                                        />
                                    }
                                    label="SydneyPost Regular + signature"
                                />
                            </Grid>
                            <Grid item>
                                <Typography>$10</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" className={classes.deliveryOptionsContainer} alignItems="center">
                            <Grid item  className={classes.deliveryOptionsCheckbox}>
                                <FormControlLabel 
                                    
                                    control={
                                        <Checkbox
                                        checked={deliveryOptions.interstate}
                                        onChange={(event) => handleDeliveryType(event.target.value, 'interstate')} 
                                        />
                                    }
                                    label="Australia Post Regular + signature"
                                />
                            </Grid>
                            <Grid item>
                                <Typography>$15</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item direction="row" className={classes.deliveryOptionsContainer} alignItems="center">
                            <Grid item className={classes.deliveryOptionsCheckbox}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox
                                        checked={deliveryOptions.international}
                                        onChange={(event) => handleDeliveryType(event.target.value, 'international')} 
                                        />
                                    }
                                    label="FedX Regular + signature"
                                />
                            </Grid>
                            <Grid item>
                                <Typography>$20</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </Grid>
    )
    
}

export default DeliveryBlock;