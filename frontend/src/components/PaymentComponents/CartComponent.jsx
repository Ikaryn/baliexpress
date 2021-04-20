import React from 'react';
import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { StoreContext } from '../../util/store';
import BaliBuilt from '../../assets/BaliBuilt.png'
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
    },
    buildSubComponents: {
        paddingLeft: '1em',
    },
    saleOldPrice: {
        textDecoration: 'line-through',
    },
    saleNewPrice: {
        color: 'rgb(255, 77, 77)',
        fontWeight: 'bold',
    },
    
}));

const CartComponent = ({totalPrice, shippingPrice}) => {
    const context = React.useContext(StoreContext);
    const { cart: [cart] } = context;
    const classes = useStyles();
    const calculateTotal = () => {
        let total = 0;
        for(const i in cart){
            console.log(cart[i]);
            if(cart[i].sale) {
                total += ((parseInt((cart[i].price)*(1 - (cart[i].sale.salepercent/100)))*cart[i].quantity))
            } else {
                total += (parseInt(cart[i].price) * cart[i].quantity);
            }
        }
        return total;
    }
    
    const generateImage = (product) => {
        if(product.parts) {
            return BaliBuilt;
        }
        return "data:image/jpeg;base64,"+product.image;
    }
    return (
        <Paper className={classes.cartContainer}>
            <Grid container direction="column" spacing={2} >
            {cart.map((product) => (
                <div>
                    <Grid container item direction="row" justify="center" spacing={2} alignItems="center">
                        <Grid item xs={2}>
                            <div  className={classes.cartImageContainer}>
                                <span className={classes.productOverlay}>
                                    {product.quantity}
                                </span>
                                <img src={generateImage(product)} 
                                    alt="product-thumbnail" 
                                    class="image"
                                    />
                            </div>
                        </Grid>   
                        <Grid item xs={8}>
                            <Typography>{product.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={product.sale && classes.saleOldPrice}>
                                ${(product.price * product.quantity).toFixed(2)}
                            </Typography>
                            {product.sale && 
                                <Typography className={classes.saleNewPrice} variant="h6">
                                    ${((product.price * (1-(product.sale.salepercent / 100))) *product.quantity).toFixed(2)}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    {product.parts && 
                        <Grid className={classes.buildSubComponents}>
                            {Object.keys(product.parts).map((part) => 
                                (product.parts[part] && 
                                    <Grid container direction="row" justify="space-between" alignItems="center">
                                        <Grid item xs={1}>
                                            <img 
                                                src={"data:image/jpeg;base64,"+product.parts[part].image} 
                                                alt={product.parts[part].name}
                                                class="image"
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography>{product.parts[part].name}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography className={product.sale && classes.saleOldPrice}>${Number(product.parts[part].price).toFixed(2)}</Typography>
                                            {product.sale && 
                                                <Typography className={classes.saleNewPrice} variant="h6">
                                                    ${((product.price * (1-(product.sale.salepercent / 100))) *product.quantity).toFixed(2)}
                                                </Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                ))}
                        </Grid>}
                </div>
                ))}
                <Divider />
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>${calculateTotal().toFixed(2)}</Typography>
                    </Grid>
                </Grid>
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <Typography>Shipping</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>${shippingPrice.toFixed(2)}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h6">Total:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>${(shippingPrice+calculateTotal()).toFixed(2)}</Typography>
                    </Grid>
                </Grid> 
            </Grid>
        </Paper>
    
    )
}

export default CartComponent;