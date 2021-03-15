import { Card, CardActionArea, CardMedia, 
        Typography, CardContent, CardActions, 
        Button} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';


const ProductCard = ({pid, name, price, image, category}) => {
    
    const history = useHistory();
    
    const handleClick = () => {
        history.push(`/product/${category}/${pid}`)
    }
    
    return (
        <Card>
            <CardActionArea onClick={() => handleClick()}>
                {/* <CardMedia 
                    title="Product image"
                    image={image}
                /> */}
                <CardContent>
                    <Typography variant="h2">
                        {name}
                    </Typography>
                    <Typography variant="h4">
                        ${price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleClick()}>View Product Details</Button>
                </CardActions>
            </CardActionArea>
        </Card>
    
    )

}

export default ProductCard;