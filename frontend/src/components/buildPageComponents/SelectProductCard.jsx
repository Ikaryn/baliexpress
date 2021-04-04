import { Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
const SelectProductCard = ({setOpen, productInfo, setProduct, category, redirect}) => {
    
    const history = useHistory();
    
    const handleRedirect = () => {
        history.push(`/product/${productInfo.category}/${productInfo.id}`)
    }

    // depending on what type of selection it is
    // either redirect back to the build page
    // or redirect to the compare page
    const handleSelect = () => {
        if (redirect === 'compare') {
            // pass in the product details via history state
            history.push({pathname:'/build/compare', state: {product: productInfo}})
        } else {
            setProduct(productInfo.category, productInfo);
        }
        setOpen(false);
    }

    return (
        <Card>
            <Grid container direction="row">
                    <Grid item xs={3}>
                        <CardMedia>
                            <img src={productInfo.image} alt={productInfo.name} />
                        </CardMedia>
                    </Grid>
                    <Grid container item direction="column" xs={6}>
                        <Grid item>
                            <Typography variant="body1">{productInfo.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{productInfo.description}</Typography>
                        </Grid>
                        <Grid item>
                            <Button color="primary" onClick={() => {handleRedirect();}}>More info</Button>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" xs={3} justify="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">${productInfo.price}.00</Typography>
                        </Grid>
                        <Grid item>
                            <Button color="primary" fullWidth variant="contained" onClick={() => {handleSelect();}}>Select</Button>
                        </Grid>
                    </Grid>
            </Grid>
        </Card>
    )

}

export default SelectProductCard;