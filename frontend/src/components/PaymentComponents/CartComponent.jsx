import React from 'react';
import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { StoreContext } from '../../util/store';

const useStyles = makeStyles(() => ({
    
    productOverlay: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: '-10px',
        top: '-10px',
        backgroundColor: 'rgb(125, 125, 125)',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
    },
    cartImageContainer: {
        position: 'relative'
    },
    cartContainer: {
        height: '100%',
        margin: '0.5em 0 0 1em',
        padding: '3em',
    }
    
}));

const CartComponent = ({totalPrice, shippingPrice}) => {
    const context = React.useContext(StoreContext);
    const { cart: [cart] } = context;
    const classes = useStyles();
        
    const calculateTotal = () => {
        let total = 0;
        for(const i in cart){
            total += (parseInt(cart[i].price) * cart[i].quantity);
        }
        return total;
    }
    
    return (
        <Paper className={classes.cartContainer}>
        <Grid container direction="column" spacing={2} >
        {cart.map((product) => (
            <Grid container item direction="row" justify="center" spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <div  className={classes.cartImageContainer}>
                        <span className={classes.productOverlay}>
                            {product.quantity}
                        </span>
                        <img src={"data:image/jpeg;base64,"+product.image} 
                            alt="product-thumbnail" 
                            class="image"
                            />
                    </div>
                </Grid>   
                <Grid item xs={7}>
                    <Typography>{product.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    ${(product.price * product.quantity).toFixed(2)}
                </Grid>
            </Grid>
            ))}
            <Divider />
            <Grid container item direction="row" justify="space-between">
                <Grid item>
                    <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                    <Typography>{calculateTotal().toFixed(2)}</Typography>
                </Grid>
            </Grid>
            <Grid container item direction="row" justify="space-between">
                <Grid item>
                    <Typography>Shipping</Typography>
                </Grid>
                <Grid item>
                    <Typography>{shippingPrice.toFixed(2)}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container item direction="row" justify="space-between">
                <Grid item>
                    <Typography>Total:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{(shippingPrice+calculateTotal()).toFixed(2)}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    
    )
}

export default CartComponent;