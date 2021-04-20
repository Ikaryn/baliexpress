import API from '../../util/API';
import React from 'react';
import { Grid, CircularProgress, makeStyles, Divider, TableSortLabel, List, ListItem, Table, LinearProgress, TableContainer, TableRow, TableHead, TableCell, Button, TableBody, Paper, Typography } from '@material-ui/core';
// import LoadingComponent from '../LoadingComponent'
import OrderTable from './OrderTable'

const api = new API();

const useStyles = makeStyles(() => ({

    progress: {
        'width': '50%'
    },

	heading: {
		'margin-top': '1em'
	},

    product: {
        margin: '0.5em'
    },

	total: {
        'padding-right': '10%',
		'margin-bottom': '1em'
	},

}))

const OrderList = ({admin}) => {

    const classes = useStyles();
    const [orders, setOrders] = React.useState(null);
    const [orderSelected, setOrderSelected] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    React.useEffect(() => {
        (async () => {

            const response = admin ? await api.get(`order?`) : await api.get(`order?userId=${localStorage.getItem('userId')}`);

            console.log(response);
            setOrders(response.orders);
        })();
    },[]);

    const OrderCard = ({orderId, admin}) => {

        const [order, setOrder] = React.useState(null);
        const [customerInfo, setCustomerInfo] = React.useState('');

        React.useEffect(() => {
            (async () => {
                const response = await api.get(`order?orderId=${orderId}`);
                if (admin) {
                    const userResponse = await api.get(`profile?userId=${response.order.userid}`);
                    setCustomerInfo(userResponse.accountInfo);
                }
                console.log(response);
                setOrder(response.order);
            })();
        },[])

        return (
            <Grid>
                {order ? 
                    <Grid container>
                        <Grid item>
                            <Button variant="contained" onClick={(event) => setOrderSelected(false)}>Back to Orders</Button>
                        </Grid>
                        <Grid item container direction="row" className={classes.heading}>
                            <Grid item container direction="column" xs={6}>
                                <Grid item>
                                    <Typography variant="h5">Order Number: {order.id}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">Order Date: {order.date}</Typography>
                                </Grid>
                            </Grid>
                            {admin &&
                                <Grid item container direction="column" xs={6}>
                                    <Grid item>
                                        <Typography variant="h5">Customer email: {customerInfo.email}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5">Customer ID: {order.userid}</Typography>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                        <Grid item container className={classes.heading}>
                            <Typography variant="h6">Purchased Items</Typography>
                        </Grid>
                        <Grid item container direction="column" alignItems="center">
                            <List>
                                <Divider variant="middle"/>
                                {order.products.map((product) => (
                                    <ListItem>
                                        <Grid item container direction="row" className={classes.product} justify="space-between" alignItems="center">
                                                <Grid item xs={1}>
                                                    <img src={"data:image/jpeg;base64,"+product.image} alt="product-thumbnail" className="image"/>
                                                </Grid>
                                                <Grid item direction="row" xs={7}>
                                                    <Typography>{product.name}</Typography>  
                                                </Grid>
                                                <Grid item container direction="column" alignItems="flex-start" xs={2}>
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
                            <Typography variant="h6">Total: ${order.total}</Typography>
                        </Grid>
                    </Grid>
                : <CircularProgress />}
            </Grid>
        )
    }

    return (
        <Grid>
            {!orderSelected ? <OrderTable orders={orders} setOrderSelected={setOrderSelected} setOrderId={setOrderId}/> : <OrderCard orderId={orderId} admin={admin}/>}
        </Grid>
    );

}

export default OrderList;