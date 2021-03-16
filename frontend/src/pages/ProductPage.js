import { Box, Button, Divider, Grid, ListItemSecondaryAction, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import amdryzen52600 from '../assets/amdryzen52600.jpg'
import '../components/styles/product.css'
import Rating from '@material-ui/lab/Rating';
import { useParams } from "react-router-dom";
import API from '../util/API';
<<<<<<< HEAD
import SpecificationList from '../components/SpecificationList';
import {
    useHistory,
  } from 'react-router-dom';
=======
// import SpecificationList from '../components/SpecificationList'

>>>>>>> 23fad95b7c65ff18e670f465cf2019ac032d501b
const api = new API();

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
    const [productInfo, setProductInfo] = React.useState({'place':'holder'});
    const { category, pid } = useParams();
    
    const [value, setValue] = React.useState(0);
    const [rating, setRating] = React.useState(0);
    const [isAdmin, setIsAdmin] = React.useState(false);
    // will be temporary to read in. (replace with values inside the product dict)
    const productDesc = ['Specs', 'Description', 'Warranty', 'Reviews'];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    React.useEffect(() => {
        (async () => {
            console.log(category)
            const products = await api.get(`product/${category}`);
            console.log(products)
            const product = products.products.filter((p) => p.id === Number(pid));
            setProductInfo(product[0]);
            console.log(product[0]);
        })();
    
    },[category, pid])
    
    React.useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const response = await api.get(`profile/${userId}?userId=${userId}`);
            const userDetails = response.accountInfo.userInfo;
            setIsAdmin(userDetails.admin);
        })();
    }, [])
    console.log(productInfo.specs);
    console.log(productInfo);
    
    return (
        <div className="root">
            <Grid container direction="column">
                <Grid container item direction="row" className="product-info">
                        <Grid item xs={3}>
                            <div className="product-image-container">
                                <img src={productInfo.image === 1 ? amdryzen52600 : "data:image/jpeg;base64,"+productInfo.image} alt="product" className="product-image"/>
                            </div>
                        </Grid>
                        <Grid container item direction="column" xs={7} alignItems="center" className="product-text-info">
                                <Grid item>
                                    <Typography variant="h4">{productInfo.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">{productInfo.brand}</Typography>
                                </Grid>
                                <Grid item container direction="row" justify="space-between" className="product-price-review">
                                    <Grid item xs={2}>
                                        <Typography variant="h5">${productInfo.price}.00</Typography>
                                    </Grid>
                                    <Grid container item direction="column" xs={2}>
                                        <Grid item>
                                            <Rating value={rating}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">0 reviews</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item >
                                    <Button variant="contained" className="cart-button">Add to Cart</Button>
                                    {isAdmin && <Button variant="contained" 
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
                            Description placeholder
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Warranty placeholder
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Review placeholder
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductPage;