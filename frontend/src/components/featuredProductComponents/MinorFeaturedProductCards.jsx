import { Card, CardActionArea, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import HighlyRated from '../../assets/HighRated.png';
const useStyles = makeStyles(() => ({
    image: {
        width: '20em'
    },
    overlay: {
        position: 'absolute',
    },
    cardContainer: {
        height: '31em',
    },
}));

const MinorFeaturedProductCards = ({productInfo}) => {
    
    const history = useHistory();
    const classes= useStyles();
    
    const handleClick = () => {
        history.push(`/product/${productInfo.category}/${productInfo.id}`);
    
    }
    
    return(
        <Card className={classes.cardContainer}>
            <CardActionArea onClick={() => {handleClick()}}>
                <div>
                    <img src={HighlyRated} alt="highly-rated-overlay" className={classes.overlay}/>
                    <img
                        className={classes.image}
                        src={"data:image/jpeg;base64,"+productInfo.image}
                        alt={productInfo.name}
                    />
                </div>
                <Typography variant="h6" >{productInfo.name}</Typography>
                <Typography variant="h6" >${productInfo.price}</Typography>
                <Typography>View Product Details</Typography>
            </CardActionArea>
        </Card>
    )

}

export default MinorFeaturedProductCards;