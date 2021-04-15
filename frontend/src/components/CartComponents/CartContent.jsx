import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { StoreContext } from '../../util/store';
import CartItem from './CartItem';
import { useHistory } from 'react-router';
const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    }
}))

const CartContent = () => {
    const context = React.useContext(StoreContext);
    const { cart: [cart, setCart] } = context;
    const [totalPrice, setTotalPrice] = React.useState(0);
    const history = useHistory();
    const classes = useStyles();
    console.log(cart);
    
    React.useEffect(() => {
        let totalPrice = 0;
        cart.forEach(product => {
            totalPrice += (product.price * product.quantity);
        })
        setTotalPrice(totalPrice);
    },[cart]);
    
    const handleClick = () => {
        history.push(`/payment`);
    }
    
    return (
    <Grid>
        {cart.length === 0 ? 
            <Typography variant="h5">Cart is empty!</Typography> 
            :
            cart.map((product) => {
                if (product.buildname) {
                    return <CartItem productInfo={product} type="build" />
                }
                return <CartItem productInfo={product} type="product"/>
        })}
        <Divider />
        <Grid container justify="space-around" direction="row">
            <Grid item>
                <Typography variant="h5">Total Price: ${totalPrice}</Typography>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleClick}
                >
                    Checkout
                </Button>
            </Grid>
        </Grid>
    </Grid>
    )
                        
                    
    
}

export default CartContent;