import { Grid, IconButton, makeStyles, Popover, Popper, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { StoreContext } from '../../util/store';
import CartContent from './CartContent';

const useStyles = makeStyles(() => ({
    root: {
        width: '500px',
    }
}))

const CartPopper = () => {
    const [cartAmount, setCartAmount] = React.useState(0);
    const context = React.useContext(StoreContext);
    const { cart: [cart] } = context;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    
    React.useEffect(() => {
        setCartAmount(cart.length);
    },[cart.length]);
    
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
      
      
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
                    style: {width: '30%', padding: '1em'},
                }}
            >
                <CartContent />
            </Popover>
        </Grid>
    )
}

export default CartPopper;