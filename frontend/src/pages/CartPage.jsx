import { Typography, Button, Checkbox, Grid, Divider } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import '../App.css';
import CartItem from '../components/CartComponents/CartItem';
import { useHistory } from 'react-router';
import { StoreContext } from '../util/store';

const CartPage = () => {

    const history = useHistory();
    
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
            direction="column" 
            className="light-text" 
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <Typography variant="h3">Cart Checkout</Typography>
            </Grid>
            <Divider />
            {cart != null && cart.map((x) => (
                <Grid item xs={12} style={{width: '60%'}}>
                    <CartItem 
                        productInfo={x} 
                        type={x.buildName ? 'build' : 'product'}
                        setCartList={setCart}
                    />
                </Grid>
            ))}
            <Divider />
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
    )

}

export default CartPage;