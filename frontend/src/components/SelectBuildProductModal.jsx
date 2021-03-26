import { Divider, Grid, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React from 'react';
import API from '../util/API';

const api = new API();

const SelectBuildProductModal = ({category}) => {

    const [products, setProducts] = React.useState([{'': ''}]);
    const [brand, setBrand] = React.useState('');
    const [brands, setBrands] = React.useState(['']);
    const [price, setPrice] = React.useState(1000);
    const [sortCriteria, setSortCriteria] = React.useState('popularity');

    React.useEffect(() => {
        (async () => {
            const response = await api.get(`product/${category}`);
            setProducts(response.products);
        })();
    },[category]);

    // function to get all of the brands of products in category passed
    const getBrands = () => {
        let productBrands = [];
        Object.keys(products).forEach((p) => {
             if(!(products[p].brand in productBrands)){
                productBrands.push(products[p].brand);
             }
        });
        console.log(productBrands);
        return productBrands;
    }

    return (
        <Grid container direction="column">
            <Paper className='select-product-modal'>
                <Grid item>
                    <Typography variant="h4">{category}</Typography>
                </Grid>
                <Grid container item direction="row">
                    <Grid item>
                        <Typography>filter by:</Typography>
                    </Grid>
                    <Grid item>
                        <Select fullWidth value={brand} onChange={(event) => {setBrand(event.target.value);}}>
                            <MenuItem value=''>Brand</MenuItem>
                            {getBrands().map((b) => (
                                <MenuItem value={b}>{b}</MenuItem>
                                ))}
                        </Select>
                    </Grid>
                    <Grid item>
                        <Typography>filter by:</Typography>
                        <Typography>placeholder</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>sort by:</Typography>
                        <Select fullWidth value={sortCriteria} onChange={(event) => {setSortCriteria(event.target.value)}}>
                            <MenuItem value={'Popularity'}>Popularity</MenuItem>
                            <MenuItem value={'Price-High'}>Price-High</MenuItem>
                            <MenuItem value={'Price-Low'}>Price-Low</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider />
            </Paper>
        </Grid>
    )
}

export default SelectBuildProductModal;