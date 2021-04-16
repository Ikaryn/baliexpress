import React from 'react';
import API from '../util/API';
import { Divider, Grid, List, ListItem, Typography, makeStyles, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const api = new API();

const useStyles = makeStyles(() => ({

    productCard: {
        'margin-top': '0.5em',
		'margin-bottom': '0.5em',
        'width': '50%'
    },

	heading: {
		'margin-left': '1em',
		'margin-top': '1em'
	},

    product: {
        margin: '0.5em'
    },

    name: {
        'margin-left': '2em',
    },

    quantityPrice: {
        'margin-left': '2em',
    },

	total: {
        'padding-right': '10%',
		'margin-bottom': '1em'
	},

}))

const OrderConfirmPage = () => {

    const classes = useStyles();
    const history = useHistory();
    const [order, setOrder] = React.useState(null)
    const [productList, setProductList] = React.useState(null)
	// const [total, setTotal] = React.useState('');

    React.useEffect(() => {
        (async () => {

            // Get the orderId from localStorage after purchasing
            const orderId = localStorage.getItem('orderId');
			// const orderId = 1;

            // If there is an orderId in localStorage, show the order details
            if (orderId) {
                const response = await api.get(`order?orderId=${orderId}`);
				const products = response.order.products;
                setOrder(response.order);
                setProductList(products);
                console.log(response);
                console.log(order);
                localStorage.removeItem('orderId');
				
				// let sum = 0;
				// products.forEach(product => (sum += product.price * product.quantity));
				// setTotal(sum);


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
					<Paper className={classes.productCard}>
						<Grid item container className={classes.heading}>
							<Typography variant="h4">Purchased Items</Typography>
						</Grid>
						<Grid item container direction="column" alignItems="center">
							<List>
								<Divider variant="middle"/>
								{order && productList && order.products.map((product) => (
									<ListItem>
										<Grid item container direction="row" className={classes.product} justify="space-between" alignItems="center">
												<Grid item xs={1}>
													<img src={"data:image/jpeg;base64,"+product.image} alt="product-thumbnail" className="image"/>
												</Grid>
												<Grid item direction="row" className={classes.name} xs={7}>
													<Typography>{product.name}</Typography>  
												</Grid>
												<Grid item container direction="column" className={classes.quantityPrice} alignItems="flex-start" xs={2}>
													<Grid item>
														<Typography>Quantity: {product.quantity}</Typography>
													</Grid>
													<Grid item>
														<Typography>Cost: {"$" + product.quantity * product.price}</Typography>
													</Grid>
												</Grid>
										</Grid>
										<Divider variant="middle"/>
									</ListItem>
								))}
								<Divider variant="middle"/>
							</List>
						</Grid>
						<Grid item container className={classes.total} justify="flex-end">
							{order && <Typography variant="h5">Total: ${order.total}</Typography>}
						</Grid>
					</Paper>
                </Grid>
            }
        </Grid>
    )
}

export default OrderConfirmPage;