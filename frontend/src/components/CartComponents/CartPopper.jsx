import { Button, Divider, Grid, IconButton, makeStyles, Popover, Popper, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useHistory } from 'react-router';
import { StoreContext } from '../../util/store';
import CartContent from './CartContent';

const useStyles = makeStyles(() => ({
    root: {
        width: '500px',
    }
}))

const CartPopper = () => {
    const context = React.useContext(StoreContext);
    const { cart: [cart] } = context;
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [cartAmount, setCartAmount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const history = useHistory();
    
    React.useEffect(() => {
        setCartAmount(cart.length);
    },[cart.length]);
    
    React.useEffect(() => {
        let totalPrice = 0;
        cart.forEach(product => {
            if(product.sale) {
                totalPrice += (Number(product.price) * (1-(product.sale.salepercent/100))*product.quantity);
            } else {
                totalPrice += (product.price * product.quantity);
            }
        })
        setTotalPrice(totalPrice);
    },[cart]);
    
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
      
    
    const handleRedirect = () => {
        history.push(`/payment`);
    }
    
    
    return (
        <Grid item xs={1}>
            <IconButton onClick={handleClick}>
            <ShoppingCartIcon fontSize="large" />
                <Typography>({cartAmount})</Typography>
            </IconButton>
            <Popover 
                open={open} 
                anchorEl={anchorEl} 
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {width: '25%', padding: '1em'},
                }}
            >
                <CartContent />
                <Divider />
                <Grid container justify="space-around" direction="row">
                    <Grid item>
                        <Typography variant="h5">Total Price: ${totalPrice.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item>
                        <Button 
                            disabled={cart.length === 0}
                            variant="contained" 
                            color="primary"
                            onClick={handleRedirect}
                        >
                        Checkout
                    </Button>
            </Grid>
        </Grid>
            </Popover>
        </Grid>
    )
}

export default CartPopper;