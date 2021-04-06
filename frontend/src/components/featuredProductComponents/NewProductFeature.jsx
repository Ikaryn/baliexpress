import { CardActionArea, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import API from '../../util/API';

const api = new API();
const useStyles = makeStyles(() => ({
    featuredImage: {
        width: '100%'
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
        history.push(`/product/${hightlightedProduct.category}/${hightlightedProduct.id}`)
    
    }
    
    return(
        <CardActionArea onClick={() => {handleClick()}}>
          <img  
            className={classes.featuredImage}
            src={"data:image/jpeg;base64,"+hightlightedProduct.product.image} 
            alt={hightlightedProduct.product.name} 
          />
        </CardActionArea>
    )
    
}

export default NewProductFeature