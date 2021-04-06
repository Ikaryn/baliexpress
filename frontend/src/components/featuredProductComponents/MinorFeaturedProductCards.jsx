import { Card, CardActionArea, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    image: {
        width: '20em'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '31em',
    }
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
                <img
                    className={classes.image}
                    src={"data:image/jpeg;base64,"+productInfo.image}
                    alt={productInfo.name}
                />
                <Typography variant="h6" >{productInfo.name}</Typography>
                <Typography variant="h6" >${productInfo.price}</Typography>
            </CardActionArea>
        </Card>
    )

}

export default MinorFeaturedProductCards;