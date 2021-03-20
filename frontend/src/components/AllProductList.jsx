import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import AdminProductCard from './AdminProductCard';

const productCategories = ['CPU', 'Motherboards', 'Storage'];

const api = new API();

const AllProductList = () => {
    
    const [products, setProducts] = React.useState([]);
    
    React.useEffect(() => {
        (async () => {

            const productsInCategory = await Promise.all(productCategories.map(async (category) => {
                const productList = await api.get(`product/${category}`);
                console.log("productList:", productList)
                return productList.products;
                
            }));
        })();
    },[]);
    
    return (
        <Grid container>
            {products.map((prods) => (
                <Grid container item>
                    {prods.map((product) => (
                        <Grid item>
                            <AdminProductCard productInfo={product} />
                        </Grid>)
                    )}
                </Grid>
            ))}
        </Grid>      
        // "hello"
    );
}

export default AllProductList;