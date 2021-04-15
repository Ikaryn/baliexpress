import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { StoreContext } from '../../util/store';
import CartItem from '../CartItem';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    }
}))

const CartContent = () => {
    const context = React.useContext(StoreContext);
    const { cart: [cart, setCart] } = context;
    const classes = useStyles();
    console.log(cart);
    
    return (!cart ? 
                    <Typography>Cart is empty!</Typography> 
                    :
                    cart.map((product) => (
                        <CartItem productInfo={product} />
                    ))
    )
                        
                    
    
}

export default CartContent;