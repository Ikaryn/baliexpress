import React from 'react';
import API from '../util/API';
import '../App.css';
import { Card, CardActionArea, Select, Typography, CardContent, Button, MenuItem} from '@material-ui/core';
import { useHistory } from 'react-router';

const api = new API();
const CartItem = (productInfo, setTotal) => {
    const history = useHistory();
    const [removed, setRemoved] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(productInfo.productInfo.quantity * productInfo.productInfo.price);
    const [quantity, setQuantity] = React.useState(productInfo.productInfo.quantity);
    const handleRemove = () => {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var ret = false;
        for(var i = 0; i < cart.length; i++){
            if(cart[i].id == productInfo.productInfo.id){
                cart.splice(i, 1);
                ret = true;
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if(ret){
            setRemoved(true);
        }
    }
    const handleQuantity = (event) => { 
        var cart = JSON.parse(localStorage.getItem('cart'));
        for(var i = 0; i < cart.length; i++){
            if(cart[i].id == productInfo.productInfo.id){
                cart[i].quantity = event.target.value;
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setTotalPrice(event.target.value * productInfo.productInfo.price);
        setQuantity(event.target.value);
        console.log(cart);
    }
    return (
        <Card className="product-card-container">
            {removed == false && <CardActionArea>
                <div className="product-card-container-action">
                    <img src={"data:image/jpeg;base64,"+productInfo.productInfo.image} alt="product-thumbnail" class="product-card-image"/>
                    <CardContent>
                        <Typography variant="subtitle1">
                            {productInfo.productInfo.name}
                        </Typography>
                        <div>
                            <Typography variant="subtitle2">
                                ${productInfo.productInfo.price} per unit
                            </Typography>
                            <Typography>
                                {"Quantity: "}
                                <Select value={quantity} onChange={handleQuantity}>
                                    <MenuItem value={1}>One</MenuItem>
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                </Select>
                            </Typography>
                        </div>
                    </CardContent>
                    <div>
                        <Button onClick={() => handleRemove()} variant="contained">
                            Remove
                        </Button>
                        <Typography>
                            Price: ${totalPrice}
                        </Typography>
                    </div>
                </div>
            </CardActionArea>}
        </Card>
    )

}

export default CartItem;