import { Paper, Typography, Grid, TextField, Divider, MenuItem } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import API from '../util/API';

const api = new API();

const sortTypes = ['Popularity', 'Price-High', 'Price-Low'];

const ProductListPage = () => {
    
    const [products, setProducts] = React.useState([]);
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const [nameFilter, setNameFilter] = React.useState("");
    const [sortType, setSortType] = React.useState(sortTypes[0]);
    
    let {category} = useParams();
    React.useEffect(() => {
        (async () => {
            const p = await api.get(`product?category=${category}`);
            if (p.products) {
                setProducts(p.products);
                setFilteredProducts(p.products);
            }
        })();
    },[category]);

    React.useEffect(() => {
        (async () => {
            var newProducts = [...products];
            if(nameFilter !== ""){
                newProducts = [...newProducts].filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()));
            }

            if(sortType === "Popularity"){
                newProducts.sort((a, b) => a.stock - b.stock);
            }else if(sortType === "Price-High"){
                newProducts.sort((a, b) => b.price - a.price);
            }else if(sortType === "Price-Low"){
                newProducts.sort((a, b) => a.price - b.price);
            }

            setFilteredProducts(newProducts);
        })();
    },[sortType, nameFilter]);

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
                            <Typography variant="h5">Brand:
                                <TextField onChange={(event) =>{setNameFilter(event.target.value)}}/>
                            </Typography>
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
                                        select
                                        value={sortType} 
                                        onChange={(event) =>{setSortType(event.target.value)}}
                                    >
                                        {sortTypes.map((s) => (
                                            <MenuItem key={s} value={s}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item direction="row" spacing={3} xs>
                        {filteredProducts.map((p) => (
                            <Grid container item xs={3} style={{display: 'flex'}}>
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