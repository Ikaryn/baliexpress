import { Paper, Typography, Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import API from '../util/API';

const api = new API();

const ProductListPage = () => {
    
    const [products, setProducts] = React.useState([]);
    
    let {category} = useParams();
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${category}`);
            console.log(products);
            
            if (products.products) {
                setProducts(products.products);
            }
        })();
    
    
    },[])
    
    return (
        <Grid container direction="row">
            <Typography variant="h1">PRODUCT PAGE</Typography>
            <Grid container item direction="column">
                <Paper>
                    <Grid item>
                        <Typography>filter placeholder</Typography>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container item direction="row">
                {products.map((p) => (
                    <Grid item>
                        <ProductCard 
                            pid={p.id}
                            name={p.name}
                            price={p.price}
                            
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
            
    )

}

export default ProductListPage;