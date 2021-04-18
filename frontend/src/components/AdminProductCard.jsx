import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const AdminProductCard = ({productInfo}) => {
    
    const history = useHistory();

    return (
        <Card>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={1}>
                    <CardMedia title="product image" className="product-card-image-container">
                        <img src={"data:image/jpeg;base64,"+productInfo.image} alt="product" class="product-card-image"/>
                    </CardMedia>
                </Grid>
                <Grid item xs={6}>
                    <CardContent>
                        <Typography variant="h6">{productInfo.name}</Typography>
                        <Typography variant="h5">${productInfo.price}</Typography>
                        <Typography variant="h5">Stock: {productInfo.stock}</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={2}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => {history.push(`/edit-product/${productInfo.category}/${productInfo.id}`)}}>Edit Product</Button>
                    <Button fullWidth variant="contained" color="primary" onClick={() => {history.push(`/product/${productInfo.category}/${productInfo.id}`)}}>View Product</Button>
                </Grid>
            </Grid>
        </Card>
    )

}

export default AdminProductCard;