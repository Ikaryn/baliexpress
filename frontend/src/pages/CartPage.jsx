import { Paper, Typography, Grid, TextField, Button, Checkbox } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import '../App.css';
import CartItem from '../components/CartItem';
import { useHistory } from 'react-router';

const api = new API();

const CartPage = () => {

    const history = useHistory();
    const cart = JSON.parse(localStorage.getItem('cart'));
    const [cartList, setCartList] = React.useState(cart);
    const [prebuild, setPrebuild] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(calcTotal());

    function calcTotal(){
        var total = 0;
        console.log(cart);
        for(const i in cart){
            total =+ parseInt(cart[i].price);
        }
        return total;
    }
    function handleTotal(){
        var total = 0;
        const cart = JSON.parse(localStorage.getItem('cart'));
        for(const i in cart){
            total =+ parseInt(cart[i].price);
        }
        setTotalPrice(total);
    }
    /*
    React.useEffect(() => {
        (async () => {
            const res = await api.get(`search?query=${search}`);
            setProductOutput(res.results);
            console.log(res.results);
        })();
    },[search])
    */
    return (
        <div>
            <div>
                {cartList != null && cartList.map((x) => (
                    <CartItem 
                        productInfo={x}
                    />
                ))}                
            </div>
            <div>
                <div>
                    <Typography color="primary">
                        Would you like to have your PC prebuilt?
                        <Checkbox onChange={() => setPrebuild(!prebuild)}/>
                    </Typography>
                </div>
                <div>
                    <Typography color="primary">
                        {"Checkout and Pay: "}
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => history.push(`/payment`)}
                        >
                            Checkout
                        </Button>
                    </Typography>
                </div>
            </div>
        </div>        
    )

}

export default CartPage;