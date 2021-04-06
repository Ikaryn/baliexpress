import { Card, CardActionArea, CardMedia, 
    Typography, CardContent} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const SmallProductView = ({pid, name, price, image, category}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/product/${category}/${pid}`)
    }
    return (
        <Card className="product-card-container">
            <CardActionArea onClick={() => handleClick()}>
                <div className="product-card-container-action">
                    <img src={"data:image/jpeg;base64,"+image} alt="product-thumbnail" class="product-card-image"/>
                    <CardContent>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>
                        <Typography variant="h6">
                            ${price}
                        </Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>

    )

}

export default SmallProductView;