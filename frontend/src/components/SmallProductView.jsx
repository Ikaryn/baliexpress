import { Card, CardActionArea, CardMedia, 
    Typography, CardContent} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

// const SmallProductView = ({pid, name, price, image, category, type, addProduct}) => {
    const SmallProductView = ({productInfo, type, addProduct, setOpen}) => {
    const history = useHistory();

    const handleClick = () => {
        if (type === 'sale') {
            addProduct(productInfo);
        } else {
            history.push(`/product/${productInfo.category}/${productInfo.id}`)
        }
        setOpen(false);
    }
    return (
        <Card className="product-card-container">
            <CardActionArea onClick={() => handleClick()}>
                <div className="product-card-container-action">
                    <img src={"data:image/jpeg;base64,"+productInfo.image} alt="product-thumbnail" class="product-card-image"/>
                    <CardContent>
                        <Typography variant="subtitle2">
                            {productInfo.name}
                        </Typography>
                        <Typography variant="h6">
                            ${productInfo.price}
                        </Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>

    )

}

export default SmallProductView;