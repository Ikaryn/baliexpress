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
    
    
    const handleQuantity = (direction) => {
        let newQuantity = quantity;
        
        //check if user is adding or subtracting quantity
        if (direction === '+') {
            // if user tries to add more quantity than stock, limit them
            if (quantity < productInfo.stock) {
                newQuantity += 1;
            }
            // dont let users to subtract quantity to negative or 0 values.
        } else {
            if (quantity !== 1) {
                newQuantity -= 1;
            }
        }
        // update the quantity and total price of the product
        setQuantity(newQuantity);
        setTotalPrice(newQuantity * productInfo.price);
        
        //update the cart with the reflected price
        const updatedCart = JSON.parse(JSON.stringify(cart));        
        const productToUpdate = updatedCart.filter(p => (p.id === productInfo.id));
        productToUpdate[0].quantity = newQuantity;
        setCart(updatedCart);
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
            <Grid container item direction="column" xs={7}>
                <Grid item>
                    <Typography variant="caption">
                        {productInfo.name ? productInfo.name : productInfo.buildname}
                    </Typography>
                </Grid>
                <Grid container item direction="row" alignItems="center" spacing={3}>
                        <Grid item xs={4}>
                            <Typography>Quantity: </Typography>
                        </Grid>
                        <Grid container item direction="row" alignItems="center" spacing={1} xs={8}>
                            <Grid item>
                                <Button size="small" variant="outlined" onClick={() => handleQuantity('-')}>-</Button>
                            </Grid>
                            <Grid item>
                                <Typography>{quantity}</Typography>
                            </Grid>
                            <Grid item>
                                <Button size="small" variant="outlined" onClick={() => handleQuantity('+')}>+</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                {/* </Grid>     */}
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