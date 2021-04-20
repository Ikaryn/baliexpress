import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Grid, Input, InputAdornment, List, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React from 'react';
import API from '../../util/API';
import { convertCategoryName } from '../../util/helpers';
import SelectProductCard from './SelectProductCard';

const api = new API();

const useStyles = makeStyles({
    productListScrollable: {
        height: 600,
        overflow: 'auto'
    }

});


const SelectBuildProductModal = ({category, setOpen, setProduct, setComparedProduct, redirect}) => {

    const [allProducts, setAllProducts] = React.useState([{'': ''}]);
    const [products, setProducts] = React.useState(allProducts);
    const [brand, setBrand] = React.useState('all');
    const [maxPrice, setMaxPrice] = React.useState(null);
    const [minPrice, setMinPrice] = React.useState(null);
    const [sortCriteria, setSortCriteria] = React.useState('Popularity');
    const [showNoStockProducts, setShowNoStockProducts] = React.useState(false);
    const classes = useStyles();

    // get all of the products in the category
    React.useEffect(() => {
        (async () => {
            // console.log(category);
            const response = await api.get(`product?category=${category}`);
            const filteredProducts = response.products.filter((product) => (product.stock > 0));
            
            setAllProducts(response.products);
            setProducts(filteredProducts);
        })();
    },[category]);

    // function to get all of the brands of products in category passed
    const getBrands = () => {
        let productBrands = [];
        Object.keys(allProducts).forEach((p) => {
            if (!(allProducts[p].brand in productBrands)) {
                productBrands.push(allProducts[p].brand);
            }
        });
        return productBrands;
    }
    
    // handle filter by price
    const handlePrice = (bound, value) => {
        // set the lower price bound
        if (bound === 'lower') {
            setMinPrice(value);
        } else {

            setMaxPrice(value)
        }
        let filteredProducts = JSON.parse(JSON.stringify(allProducts));
        if (bound === 'lower') {
            // if the upper bound price then just find prices above the lower bound
            if (!maxPrice) { 
                filteredProducts = filteredProducts.filter((p) => (Number(p.price) >= value))
            } else {
                filteredProducts = filteredProducts.filter((p) => (p.price >= value && p.price <= maxPrice));
            }   
        } else {
            if (!minPrice && value !== '') {
                filteredProducts = filteredProducts.filter((p) => (p.price <= value))
            } else if (value !== '') {
                filteredProducts = filteredProducts.filter((p) => (p.price <= value && p.price >= minPrice));
            }   
        }

        setProducts(filteredProducts);
        
    }
    
    //handle filter by brands
    const handleFilter = (value) => {
        setBrand(value);
        let filteredProducts = JSON.parse(JSON.stringify(allProducts));
        if (value !== 'all') {
            filteredProducts = filteredProducts.filter((product) => (
                product.brand === value
            ))
        }
        setProducts(filteredProducts);
    }
    
    const handleSort = (value) => {
        setSortCriteria(value);
        const newSorted = JSON.parse(JSON.stringify(products));
        switch (value) {
            case "Price-High":
                newSorted.sort((a,b) => (
                    b.price - a.price
                ));
                break;
            case "Price-Low":
                newSorted.sort((a,b) => (
                    a.price - b.price
                ));
                break;
            // popularity
            default: 
                newSorted.sort((a,b) => (
                    b.sold - a.sold
                ))
                break;
        }
        setProducts(newSorted);
    }

    // if user wants to see products with no stock
    const handleShowStock = (checked) => {
        setShowNoStockProducts(checked);
        let returnProducts = JSON.parse(JSON.stringify(allProducts));
        if (showNoStockProducts) {
            console.log('hello')
            returnProducts = returnProducts.filter((product) => (product.stock > 0));
        }
        setProducts(returnProducts)
        // handleSort(sortCriteria);
        // handleFilter(brand);
        // handlePrice('upper', maxPrice);
        // handlePrice('lower', minPrice);

    } 

    return (
        <Grid container direction="column">
            <Paper className='select-product-modal'>
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h4">{category}</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={()=>{setOpen(false)}}>X</Button>
                    </Grid>
                </Grid>
                <Grid container item direction="row" justify="center" alignContent="center">
                    <Grid item xs={3}>
                        <Typography>filter by:</Typography>
                        <Select  value={brand} onChange={(event) => {handleFilter(event.target.value);}}>
                            <MenuItem value='all'>Brand</MenuItem>
                            {getBrands().map((b) => (
                                <MenuItem value={b}>{b}</MenuItem>
                                ))}
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Filter by Price:</Typography>
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Input
                                        value={minPrice ? minPrice: ''}
                                        onChange={event => handlePrice('lower' , event.target.value)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                Min
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>-</Grid>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Input
                                        value={maxPrice ? maxPrice: ''}
                                        onChange={event => handlePrice('upper' , event.target.value)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                Max
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>sort by:</Typography>
                        <Select  value={sortCriteria} onChange={(event) => {handleSort(event.target.value)}}>
                            <MenuItem value={'Popularity'}>Popularity</MenuItem>
                            <MenuItem value={'Price-High'}>Price-High</MenuItem>
                            <MenuItem value={'Price-Low'}>Price-Low</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={2}> 
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={showNoStockProducts} 
                                    onChange={(event) => {handleShowStock(event.target.checked)}}
                                />
                            }
                            label="Show backorder Products"
                          />
                    </Grid>
                </Grid>
                <Divider />
                <List className={classes.productListScrollable}>
                    <Grid container direction="column" alignContent="center">
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12}>
                                <SelectProductCard 
                                    setOpen={setOpen} 
                                    productInfo={product} 
                                    setProduct={setProduct}
                                    setComparedProduct={setComparedProduct}
                                    redirect={redirect}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </List>
            </Paper>
        </Grid>
    )
}

export default SelectBuildProductModal;