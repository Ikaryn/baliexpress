import { CardActionArea, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import API from '../../util/API';
import NewProduct from '../../assets/NewProduct.png';

const api = new API();

const useStyles = makeStyles(() => ({
    featuredImage: {
        width: '100%'
    },
    imageOverlay: {
        position: 'absolute',
        bottom: '0.2em'
    },
    newImageOverlay: {
        position: 'absolute',
        right: '0'
    }
}))


const NewProductFeature = ({feature}) => {
    const [hightlightedProduct, setHighlightedProduct] = React.useState({'index': 0, 'product': feature[0]});
    const history = useHistory();
    const classes = useStyles();

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (hightlightedProduct.index === 2){
                setHighlightedProduct({'index': 0, 'product': feature[0]});
            } else {
                setHighlightedProduct(
                    {'index': hightlightedProduct.index + 1, 'product':feature[hightlightedProduct.index + 1]});
                }   
            }, 5000)
            
            return () => {
                clearInterval(interval)
            }
    }, [feature, hightlightedProduct]);
    
    
    const handleClick = () => {

        history.push(`/product/${hightlightedProduct.product.category}/${hightlightedProduct.product.id}`)
    
    }
    
    return(
        <CardActionArea onClick={() => {handleClick()}}>
            <div>
                <img
                    className={classes.newImageOverlay}
                    src={NewProduct}
                    alt="new-product"
                />
                <img  
                  className={classes.featuredImage}
                  src={"data:image/jpeg;base64,"+hightlightedProduct.product.image} 
                  alt={hightlightedProduct.product.name} 
                  />
                <Paper className={classes.imageOverlay}>
                    <Typography>
                        {'Displayed Product: ' +hightlightedProduct.product.name}
                    </Typography>
                </Paper>
            </div>
            {/* <img
                className={classes.newImageOverlay}
                src={NewProduct}
                alt="new-product"
            /> */}
        </CardActionArea>
    )
    
}

export default NewProductFeature