import React from 'react';
import API from '../util/API';
import { Grid, Typography } from '@material-ui/core';

const api = new API();

const OrderConfirmPage = () => {

    const [order, setOrder] = React.useState([])

    React.useEffect(() => {
        (async () => {
            let {orderId} = useParams();
            if (orderId) {
                const response = await api.get(`order?orderId=${orderId}`);
                setOrder(response.order);
                console.log(order);
            }
        })();
    },[]);

    return (
        <Grid container>
            {order &&
                <Grid>
                    <Grid>
                        <Typography>Your order has been placed!</Typography>
                    </Grid>
                    <Grid>
                        <Typography>Order Number:{order.orderId}</Typography>
                    </Grid>
                    <Grid>
                        <Typography>Order Date: {order.date}</Typography>
                    </Grid>
                    <Grid>
                        {order.products.map((product) => (
                            <Grid container item>
                                <Grid item>
                                  <Typography>{product.name}</Typography>  
                                </Grid>
                                <Grid item>
                                    <Typography>Quantity: {product.quantity}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

export default OrderConfirmPage;