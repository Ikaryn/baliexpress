import React from 'react';
import API from '../util/API';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const api = new API();

const useStyles = makeStyles(() => ({

    productCard: {
        'margin-top': '1em',
        'width': '75%'
    },

    product: {
        margin: '0.5em'
    },

    name: {
        'margin-left': '2em',
    },

    quantityPrice: {
        'margin-left': '2em'
    },

}))

const OrderConfirmPage = () => {

    const classes = useStyles();
    const history = useHistory();
    const [order, setOrder] = React.useState(null)
    const [productList, setProductList] = React.useState(null)

    React.useEffect(() => {
        (async () => {

            // Get the orderId from localStorage after purchasing
            const orderId = localStorage.getItem('orderId');

            // If there is an orderId in localStorage, show the order details
            if (orderId) {
                const response = await api.get(`order?orderId=${orderId}`);
                setOrder(response.order);
                setProductList(response.order.productList);
                console.log(response);
                console.log(order);
                localStorage.removeItem('orderId');
            // If there is no orderId (e.g. from someone manually accessing the url), then redirect to the homepage
            } else {
                history.push(`/`);
            }
        })();
    },[]);

    return (
        <Grid container className="light-text">
            {order &&
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Your order has been placed!</Typography>
                    </Grid>
                    <Grid item container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">Order Number: {order.id}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Order Date: {order.date}</Typography>
                        </Grid>
                    </Grid>
					<Grid item container className={classes.productCard}>
						<Typography variant="h4">Products</Typography>
					</Grid>
                    <Grid item container direction="column" alignItems="center">
                        {order && productList && order.products.map((product) => (
                            <Paper className={classes.productCard}>
                                <Grid item container direction="row" className={classes.product} justify="flex-start" alignItems="center">
                                        <Grid item xs={1}>
                                            <img src={"data:image/jpeg;base64,"+productList[product.productid].image} alt="product-thumbnail" className="image"/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography className={classes.name}>{productList[product.productid].name}</Typography>  
                                        </Grid>
                                        <Grid item container direction="column" xs={2} className={classes.quantityPrice} alignItems="flex-start">
                                            <Grid item>
                                                <Typography>Quantity: {product.quantity}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography>Cost: {"$" + product.quantity * productList[product.productid].price}</Typography>
                                            </Grid>
                                        </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

export default OrderConfirmPage;