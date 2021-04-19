import React from 'react';
import API from '../../util/API';
import { Card, CardActionArea, Select, Typography, CardContent, Button, MenuItem, OutlinedInput, Grid, TextField} from '@material-ui/core';
import { useHistory } from 'react-router';
import { StoreContext } from '../../util/store';

const CartItem = ({productInfo, setCartList, type}) => {
    
    const context = React.useContext(StoreContext);
    const { cart: [cart, setCart] } = context;
    const [totalPrice, setTotalPrice] = React.useState(productInfo.quantity * productInfo.price);
    const [quantity, setQuantity] = React.useState(productInfo.quantity);
    
    console.log(productInfo);
    
    const handleRemove = () => {
        const updatedCart = JSON.parse(JSON.stringify(cart));        
        const newCart = updatedCart.filter(product => productInfo.id !== product.id);
        setCart(newCart);
    }
    
    
    const handleQuantity = (value) => { 
        
        const updatedCart = JSON.parse(JSON.stringify(cart));
        
        const found = updatedCart.filter(product => productInfo.id === product.id);
        if (found) {
            found[0].quantity = value;
        }
        setTotalPrice(value * productInfo.price);
        setQuantity(value);
        setCart(updatedCart);
        console.log(cart);
    }
    return (
        <Grid container item direction="row" spacing={1} justify="flex-end" alignItems="center">
            <Grid item xs={2}>
                {type === 'product' ? 
                    <img 
                        src={"data:image/jpeg;base64,"+productInfo.image} 
                        alt="product-thumbnail" 
                        class="image"
                    />
                    :
                    <img 
                        src={"data:image/jpeg;base64,"+productInfo.parts.Cases.image}
                        alt="product-thumbnail" 
                        class="image"
                    />
                }
            </Grid>
            <Grid container item direction="column" xs={6}>
                <Grid item>
                    <Typography variant="caption">
                        {productInfo.name ? productInfo.name : productInfo.buildname}
                    </Typography>
                </Grid>
                <Grid container item direction="row" alignItems="center" spacing={3}>
                    <Grid item xs={4}>
                        <Typography>Quantity: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            value={quantity} 
                            variant="outlined"
                            onChange={(event) => {handleQuantity(event.target.value)}}
                            size='small'
                        />
                    </Grid>
                </Grid>    
            </Grid>
            <Grid container item direction="column" xs={3}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                </Grid>
                <Grid item>
                    <Typography>
                        Price: ${totalPrice}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default CartItem;