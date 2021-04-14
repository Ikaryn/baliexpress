import React from 'react';
import API from '../util/API';
import { Grid, Typography } from '@material-ui/core';

const api = new API();

const OrderConfirmPage = () => {

    const [order, setOrder] = React.useState([])
    const [productList, setProductList] = React.useState({})

    React.useEffect(() => {
        (async () => {
            let {orderId} = useParams();
            if (orderId) {
                const response = await api.get(`order?orderId=${orderId}`);
                setOrder(response.order);
                setProductList(response.order.productList);
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
                        {order.products.map((productId) => (
                            <Grid container item>
                                <Grid item>
                                  <Typography>{productList[productId].name}</Typography>  
                                </Grid>
                                <Grid item>
                                    <Typography>Quantity: {order.products[productId]}</Typography>
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