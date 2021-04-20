import { Card, CardActionArea, CardMedia, 
        Typography, CardContent, CardActions, 
        Button, Grid, makeStyles, Box, Paper} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import amdryzen52600 from '../assets/amdryzen52600.jpg'

const useStyles = makeStyles(() => ({
    productCardContainer: {
        height: '100%',
        
    },
    productInfoContainer: {
        height: '50%',
    },
    viewMoreContainer: {
        paddingBottom: '1em',
        paddingLeft: '1em',
    },
    saleOldPrice: {
        textDecoration: 'line-through',
    },
    saleNewPrice: {
        color: 'rgb(255, 77, 77)',
        fontWeight: 'bold',
    },
    saleOverlay: {
        position: 'absolute',
        top: '3em'
    }
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
        <Card>
            <CardActionArea onClick={() => handleClick()} className={classes.productCardContainer} >
            <Grid container item direction="column" className={classes.productCardContainer}>
                    <Grid item>
                        <CardMedia title="Product image" className="product-card-image-container">
                            <div>
                                <Paper className={classes.saleOverlay}>
                                    {sale &&<Typography className={classes.saleNewPrice}>-{sale.salepercent}%</Typography>}
                                </Paper>
                                <img src={"data:image/jpeg;base64,"+image} alt="product-thumbnail" className="image"/>
                            </div>
                        </CardMedia>
                    </Grid>
                    <Grid container item direction="column" justify="space-between">
                        <CardContent>
                            <Grid item>
                                <Typography variant="h6">
                                    {name}
                                </Typography>
                            </Grid>
                            {sale ?
                            <Grid container item direction="row">
                                <Grid item>
                                    <Typography variant="h6" className={classes.saleOldPrice}>
                                        ${price.toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" className={classes.saleNewPrice}>
                                        ${productPrice} On Sale!
                                    </Typography>
                                </Grid>
                            </Grid>
                            :
                            <Grid item>
                                <Typography variant="h5">
                                    ${productPrice}
                                </Typography>
                            </Grid>
                            }
                        </CardContent>
                        <Grid item className={classes.viewMoreContainer}>
                            <Typography>View Product Details</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </CardActionArea>
        </Card>
    )

}

export default ProductCard;