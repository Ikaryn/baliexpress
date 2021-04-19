import { Typography, Button, Checkbox, Grid, Divider, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import '../App.css';
import CartItem from '../components/CartComponents/CartItem';
import { useHistory } from 'react-router';
import { StoreContext } from '../util/store';

const useStyles = makeStyles(() => ({
    cartContainer: {
        margin: '0 20%'
    },
    divider: {
        width: '80%',
    }
}));

const CartPage = () => {

    const history = useHistory();
    const classes = useStyles();
    const context = React.useContext(StoreContext);
    const {cart : [cart, setCart]} = context;
    
    // Calculate the final price in the cart.
    function calcTotal(){
        let total = 0;
        for(const i in cart){
            total += (parseInt(cart[i].price) * cart[i].quantity);
        }
        return total;
    }
    
    return (
        <Grid 
            container 
            className='light-text'
        >
            <Paper className={classes.cartContainer}>
                    <Grid 
            container 
            direction="column" 
            className='light-text'
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <Typography variant="h3">Cart Checkout</Typography>
            </Grid>
            <hr className={classes.divider} />
            {cart != null && cart.map((x) => (
                <Grid item xs={12} >
                    <CartItem 
                        productInfo={x} 
                        type={x.buildName ? 'build' : 'product'}
                        setCartList={setCart}
                        />
                </Grid>
            ))}
            <hr className={classes.divider} />
            <Grid item container direction="column" alignItems="center">
                <Typography variant="h6">Shipping</Typography>
                
            </Grid>
            <hr className={classes.divider} />
            <Grid item container direction="row" justify="center">
                <Grid item xs={3}>
                    <Typography variant="h4">Total Price: ${calcTotal().toFixed(2)}</Typography>
                </Grid>
                <Grid item container direction="row" xs={2}  alignItems="center">
                    <Grid item xs={7}>
                        <Typography>Checkout and Pay:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => history.push(`/payment`)}
                            >
                            Checkout        
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
            </Paper>
        </Grid>   
    )

}

export default CartPage;