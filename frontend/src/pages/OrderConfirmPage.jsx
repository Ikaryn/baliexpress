import React from 'react';
import API from '../util/API';
import { Grid, Typography } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router'

const api = new API();

const OrderConfirmPage = () => {

    const history = useHistory();
    const [order, setOrder] = React.useState(null)
    const [productList, setProductList] = React.useState(null)
    // let {oid} = useParams();

    React.useEffect(() => {
        // console.log("orderId is", oid);
        (async () => {
            const orderId = localStorage.getItem('orderId');
            if (orderId) {
                const response = await api.get(`order?orderId=${orderId}`);
                setOrder(response.order);
                setProductList(response.order.productList);
                console.log(response);
                console.log(order);
                localStorage.removeItem('orderId');
            } else {
                history.push(`/`);
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
                        <Typography>Order Number:{order.id}</Typography>
                    </Grid>
                    <Grid>
                        <Typography>Order Date: {order.date}</Typography>
                    </Grid>
                    <Grid>
                        {order && productList && order.products.map((product) => (
                            <Grid container item>
                                <Grid item>
                                  <Typography>{productList[product.productid].name}</Typography>  
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