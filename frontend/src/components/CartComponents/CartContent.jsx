import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { StoreContext } from '../../util/store';
import CartItem from './CartItem';
// import { useHistory } from 'react-router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
    emptyCart: {
        padding: '2em'
    },
    productListScrollable: {
        maxHeight: 300,
        overflow: 'auto',
        overflowX: 'hidden',
    }
}))

const CartContent = () => {
    const context = React.useContext(StoreContext);
    const { cart: [cart,] } = context;
    
    // const history = useHistory();
    const classes = useStyles();
    console.log(cart);
    
    // const handleClick = () => {
    //     history.push(`/payment`);
    // }
    
    const generateCartContent = (product) => {
        console.log(product);
        if (product.name) {
            return (
                <div>
                    <CartItem productInfo={product} type="build" />
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>View parts</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction='column'>
                                {Object.keys(product.parts).map((part) => 
                                    (product.parts[part] && 
                                        <Grid container direction="row" justify="space-between">
                                            <Grid item xs={10}>
                                                <Typography variant="caption">{product.parts[part].name}</Typography>        
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="caption">${Number(product.parts[part].price).toFixed(2)}</Typography>
                                            </Grid>
                                        </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
                
            )
        }
        return <CartItem productInfo={product} type="product"/>
    }
    
    return (
    <Grid className={classes.productListScrollable}>
        {cart.length === 0 ? 
            <Grid container item justify="center" className={classes.emptyCart}>
                <Typography>Cart is empty!</Typography>
            </Grid>
            :
            cart.map((product) => (generateCartContent(product)))
        }
        <Divider />
    </Grid>
    )
                        
                    
    
}

export default CartContent;