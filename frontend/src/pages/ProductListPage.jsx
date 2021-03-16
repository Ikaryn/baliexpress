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
    
        // console.log(category);
    },[category])
    
    return (
        <div className="root">
            <Grid container direction="row" className='product-list-page-container'>
                <Grid container item direction="column" wrap='nowrap' xs={3}>
                    <div className="product-list-filter-container">
                        <Typography>filter placeholder</Typography>
                    </div>
                </Grid>
                <Grid container item direction="row" xs={9} spacing={3}>
                    {products.map((p) => (
                        <Grid item xs={3}>
                            <ProductCard 
                                pid={p.id}
                                name={p.name}
                                price={p.price}
                                image={p.image}
                                category={p.type}
                                />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
            
    )

}

export default ProductListPage;