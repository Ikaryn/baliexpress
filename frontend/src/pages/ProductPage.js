import { Box, Button, Divider, Grid, ListItemSecondaryAction, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import amdryzen52600 from '../assets/amdryzen52600.jpg'
import '../components/styles/product.css'
import Rating from '@material-ui/lab/Rating';
import { useParams } from "react-router-dom";
import API from '../util/API';
import SpecificationList from '../components/SpecificationList'

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
    const [productInfo, setProductInfo] = React.useState({'place':'holder'});
    
    const { category, pid } = useParams();
    
    const [value, setValue] = React.useState(0);
    const [rating, setRating] = React.useState(0);
    const [isAdmin, setIsAdmin] = React.useState(0);
    // will be temporary to read in. (replace with values inside the product dict)
    const productDesc = ['Specs', 'Description', 'Warranty', 'Reviews'];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    React.useEffect(() => {
        (async () => {
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
    
    
    return (
        <div className="root">
            <Grid container direction="column">
                <Grid container item direction="row" className="product-info">
                        <Grid item xs={3}>
                            <div className="product-image-container">
                                <img src={amdryzen52600} alt="product" className="product-image"/>
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
                                </Grid>
                        </Grid>
                </Grid>
                <Grid item className="product-info">
                    <Paper elevation={3}>
                        <Tabs value={value} onChange={handleChange}>
                            {productDesc.map((v) => (<Tab label={v} />))}
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            Specifications placeholder
                            {/* <SpecificationList specs={productInfo.specs} /> */}
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