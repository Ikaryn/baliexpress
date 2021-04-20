import React from 'react';
import { Typography, Button, Grid, makeStyles} from '@material-ui/core';
import { StoreContext } from '../../util/store';
import BaliBuilt from '../../assets/BaliBuilt.png'
const useStyles = makeStyles(() => ({
    saleOldPrice: {
        textDecoration: 'line-through',
    },
    saleNewPrice: {
        color: 'rgb(255, 77, 77)',
        fontWeight: 'bold',
    },

}))
const CartItem = ({productInfo, type}) => {
    const classes = useStyles();
    const context = React.useContext(StoreContext);
    const { cart: [cart, setCart] } = context;
    const [totalPrice, setTotalPrice] = React.useState(productInfo.quantity * productInfo.price);
    const [quantity, setQuantity] = React.useState(productInfo.quantity);
    console.log(cart);
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
                        src={BaliBuilt}
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
            </Grid>
            <Grid container item direction="column" xs={3}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                </Grid>
                <Grid item>
                    <Typography className={productInfo.sale && classes.saleOldPrice}>
                        Price: ${totalPrice}
                    </Typography>
                    {productInfo.sale && 
                        <Typography className={classes.saleNewPrice} variant="h6">
                            ${((productInfo.price - (productInfo.price * (productInfo.sale.salepercent / 100))) *productInfo.quantity).toFixed(2)}
                        </Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
    )

}

export default CartItem;