import { Card, CardActionArea, CardMedia, 
        Typography, CardContent, CardActions, 
        Button, Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import amdryzen52600 from '../assets/amdryzen52600.jpg'

const useStyles = makeStyles(() => ({
    productCardContainer: {
        height: '100%'
    }
}))

const ProductCard = ({pid, name, price, image, category}) => {
    
    const classes = useStyles();
    const history = useHistory();
    
    const handleClick = () => {
        history.push(`/product/${category}/${pid}`)
    }
    
    return (
        <Grid container item direction="column" alignItems="stretch" justify="space-between" >
            <Card className={classes.productCardContainer}>
                    <CardActionArea onClick={() => handleClick()}>
                        <CardMedia title="Product image" className="product-card-image-container">
                            <img src={"data:image/jpeg;base64,"+image} alt="product-thumbnail" class="product-card-image"/>
                        </CardMedia>
                        <CardContent>
                            <Typography variant="h6">
                                {name}
                            </Typography>
                            <Typography variant="h5">
                                ${price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleClick()}>View Product Details</Button>
                        </CardActions>
                    </CardActionArea>
            </Card>
        </Grid>
    )

}

export default ProductCard;