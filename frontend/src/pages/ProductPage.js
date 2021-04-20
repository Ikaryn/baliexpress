import { Box, Button, Divider, Grid, makeStyles, Paper, Snackbar, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import amdryzen52600 from '../assets/amdryzen52600.jpg'
import '../components/styles/product.css'
import Rating from '@material-ui/lab/Rating';
import { useParams } from "react-router-dom";
import API from '../util/API';
import { useHistory } from 'react-router';
import ReviewBlock from '../components/reviewComponents/ReviewBlock';
import { StoreContext } from '../util/store';
import Alert from '@material-ui/lab/Alert';

const api = new API();

const useStyles = makeStyles(() => ({
    productCardContainer: {
        height: '100%'
    },
    saleOldPrice: {
        textDecoration: 'line-through',
    },
    saleNewPrice: {
        color: 'rgb(255, 77, 77)',
        fontWeight: 'bold',
    },
    availabileProduct: {
        color: 'rgb(0, 255, 0)',
    },
    divider: {
        backgroundColor: 'white',
        height: '3px',
    }
}))


const TabPanel = ({children, value, index, ...other}) => {
    return (<div 
        hidden={value !== index}
        {...other}
    >
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
    </div>)

}

const ProductPage = () => {
    const history = useHistory();
    const context = React.useContext(StoreContext);
    const { cart: [cart, setCart] } = context;
    
    const [productInfo, setProductInfo] = React.useState({'place':'holder'});
    const { category, pid } = useParams();
    const [value, setValue] = React.useState(0);
    const [rating, setRating] = React.useState({rating:0, num: 0});
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [price, setPrice] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const [success, setSuccess] = React.useState(false);
    
    const classes = useStyles();
    // will be temporary to read in. (replace with values inside the product dict)
    const productDesc = ['Specs', 'Description', 'Warranty'];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    // find the specific product to display its information
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product?category=${category}`);
            const product = products.products.filter((p) => Number(p.id) === Number(pid));
            let productPrice = product[0].price;
            console.log(product[0]);
            if (product[0].sale) {
                productPrice = (product[0].price - (product[0].price * (product[0].sale.salepercent / 100))).toFixed(2);
            }
            setPrice(productPrice);
            setProductInfo(product[0]);
        })();
        
    },[category, pid, productInfo.price])
    
    // check if the current user is admin and set the relevant state
    React.useEffect(() => {
        (async () => {
            
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await api.get(`profile?userId=${userId}`);
                const userDetails = response.accountInfo;
                setIsAdmin(userDetails.admin);
            }
        })();
    }, [])
    // add the item to the cart.
    const handleCart = () => {
        const newCart = JSON.parse(JSON.stringify(cart));
        
        const found = newCart.filter(product => productInfo.id === product["id"]);
        if (!found[0]) {
            newCart.push({
                "name": productInfo.name,
                "id": productInfo.id,
                "image": productInfo.image,
                "price": price,
                "quantity": quantity,
                "category": productInfo.category,
                "stock": productInfo.stock,
            });
        } else {
            let newQuantity = Number(found[0]['quantity']) + quantity;
            if(newQuantity > productInfo.stock) {
                newQuantity = productInfo.stock;
            }
            
            found[0]['quantity'] = newQuantity;
        }
        setSuccess(true);
        setCart(newCart);
    }
    
    const handleQuantity = (direction) => {
        if (direction === '+') {
            if (quantity < productInfo.stock) {
                setQuantity(quantity + 1);
            }
        } else {
            if (quantity !== 1) {
                setQuantity(quantity - 1);
            }
        }
    
    }
    
    return (
        <div className="root" >
            <Grid container direction="column" className="light-text">
                <Grid container item direction="row" className="product-info" >
                        <Grid item xs={3}>
                            <div className="product-image-container">
                                <img src={"data:image/jpeg;base64,"+productInfo.image} alt="product" className="product-image"/>
                            </div>
                        </Grid>
                        <Grid container item direction="column" xs={7} alignItems="center" className="product-text-info">
                                <Grid item>
                                    <Typography variant="h4">{productInfo.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">{productInfo.brand}</Typography>
                                </Grid>
                                <Divider classes={{root: classes.divider}} />
                                <Grid item container direction="row" justify="space-between" className="product-price-review">
                                    <Grid item xs={7}>
                                        {productInfo.sale ?
                                            <Grid container item direction="column">
                                                <Grid item>
                                                    <Typography variant="h5"  className={classes.saleOldPrice}>
                                                        ${productInfo.price.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="h5" className={classes.saleNewPrice}>
                                                        ${price} On Sale!
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            :
                                            <Typography variant="h5">
                                                ${price}
                                            </Typography>}
                                        <Grid container item direction="row" alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Typography>Quantity:</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="outlined" onClick={() => handleQuantity('-')}>-</Button>
                                            </Grid>
                                            <Grid item>
                                                <Typography>{quantity}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="outlined" onClick={() => handleQuantity('+')}>+</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="column" xs={2}>
                                        <Grid item>
                                            <Rating value={rating.rating} readOnly/>
                                        </Grid>
                                        <Grid item>
                                            <Typography className="light-text" variant="h6">{rating.num} reviews</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider classes={{root: classes.divider}} />
                                <Grid container item>
                                    <Grid item>
                                        <Typography>Availability:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography className={productInfo.stock > 0 ? classes.availabileProduct : classes.saleNewPrice}>
                                            {productInfo.stock > 0 ? 'In Stock!' : 'Out of Stock'}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                
                                <Grid item >
                                    <Button 
                                        color="primary" 
                                        variant="contained" 
                                        className="cart-button" 
                                        disabled={productInfo.stock === 0}
                                        onClick={() => {handleCart()}}
                                    >
                                        Add to Cart
                                    </Button>
                                    {isAdmin && <Button color="primary" variant="contained" 
                                        className="cart-button" 
                                        onClick={() => {history.push(`/edit-product/${category}/${pid}`)}}
                                    >
                                        Edit Product
                                    </Button>}
                                </Grid>
                        </Grid>
                </Grid>
                <Grid item className="product-info">
                    <Paper elevation={3}>
                        <Tabs value={value} onChange={handleChange}>
                            {productDesc.map((v) => (<Tab label={v} />))}
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            {/* Specifications placeholder */}
                            {/* <SpecificationList specs={productInfo.specs} /> */}
                            <Grid container direction="column" className="product-spec-list">
                                {productInfo.specs && Object.keys(productInfo.specs).map((key) => (
                                    <Grid item container direction="row" justify="space-between">
                                        <Grid item>
                                            <Typography variant="h6">{key}:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">{productInfo.specs[key]}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {productInfo.description}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {productInfo.warranty}
                        </TabPanel>
                    </Paper>
                </Grid>
                <Grid item>
                    {productInfo.id && <ReviewBlock rating={rating} productId={productInfo.id} setRating={setRating}/>}
                </Grid>
            </Grid>
            <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
                <Alert severity="success">Successfully added product to cart.</Alert>
            </Snackbar>
        </div>
    )
}

export default ProductPage;