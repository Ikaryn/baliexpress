import { Card, CardActionArea, CardMedia, 
        Typography, CardContent, CardActions, 
        Button, Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    productCardContainer: {
        height: '100%'
    },
}))

const ProductCard = ({pid, name, price, image, category, sale}) => {
    
    const classes = useStyles();
    const history = useHistory();
    
    
    // if the product is on sale, calculate the price
    const productPrice = (() => {
        if (sale) {
            return (price - (price * (sale.salepercent / 100))).toFixed(2);
        }
        return price.toFixed(2);
    })();
    
    
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
                            {sale ?
                            <div>
                                <Typography variant="h5" className="saleOldPrice">
                                    ${price.toFixed(2)}
                                </Typography>
                                <Typography variant="h5" className='saleNewPrice'>
                                    ${productPrice} On Sale!
                                </Typography>
                            </div>
                            :
                            <Typography variant="h5">
                                ${productPrice}
                            </Typography>
                            }
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