import { Paper, Typography, Grid, TextField, Divider } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import API from '../util/API';

const api = new API();

const sortTypes = ['Popularity', 'Price-High', 'Price-Low'];

const ProductListPage = () => {
    
    const [products, setProducts] = React.useState([]);
    const [sortType, setSortType] = React.useState('Popularity')
    
    const handleSortChange = (value) => {
        setSortType(value);
    }
    
    let {category} = useParams();
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${category}`);
            console.log(products);
            
            if (products.products) {
                setProducts(products.products);
            }
        })();
    },[category]);
    
    return (
        <div className="root">
            <Grid container direction="row" className='product-list-page-container'>
                <Grid container item direction="column" wrap='nowrap' xs={3}>
                    <div className="product-list-filter-container">
                        <Grid item>
                                <Typography variant="h4">Narrow your search</Typography>
                                <Divider />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Brand:</Typography>
                        </Grid>
                    </div>
                </Grid>
                <Grid container item direction="column"  xs={9}>
                    <Grid container item>
                        <Paper className="product-list-sort-tab">
                            <Grid container item direction="row">
                                <Grid item>
                                    <Typography variant="h6">Sort by:</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField 
                                        select value={sortType} 
                                        onChange={handleSortChange}
                                        SelectProps={{native:true}}
                                        >
                                        {sortTypes.map((type) => (
                                            <option value={type}>{type}</option>
                                            ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item direction="row" spacing={3}>
                        {products.map((p) => (
                            <Grid item xs={3}>
                                <ProductCard 
                                    pid={p.id}
                                    name={p.name}
                                    price={p.price}
                                    image={p.image}
                                    category={p.category}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
            
    )

}

export default ProductListPage;