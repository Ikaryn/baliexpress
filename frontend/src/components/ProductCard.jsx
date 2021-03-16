import { Card, CardActionArea, CardMedia, 
        Typography, CardContent, CardActions, 
        Button} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import amdryzen52600 from '../assets/amdryzen52600.jpg'

const ProductCard = ({pid, name, price, image, category}) => {
    
    const history = useHistory();
    
    const handleClick = () => {
        history.push(`/product/${category}/${pid}`)
    }
    console.log(image);
    return (
        <Card>
            <CardActionArea onClick={() => handleClick()}>
                {/* <CardMedia 
                    title="Product image"
                    src={image === 1 ? amdryzen52600 : "data:image/jpeg;base64,"+image}
                    // src={amdryzen52600}
                /> */}
                <div className="product-card-image-container">
                    <img src={"data:image/jpeg;base64,"+image} alt={name} className="product-card-image"/>
                </div>
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
    
    )

}

export default ProductCard;