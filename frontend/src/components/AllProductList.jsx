import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import { allProductCategories } from '../util/helpers';
import AdminProductCard from './AdminProductCard';
import ProductStats from './StatsComponents/ProductStats';

const api = new API();

const AllProductList = () => {
    
    const [products, setProducts] = React.useState([]);
    const [productStatsOpen, setProductStatsOpen] = React.useState(false);
    const [viewedProduct, setViewedProduct] = React.useState(null);
    
    React.useEffect(() => {
        (async () => {

            const productsInCategory = await Promise.all(Object.keys(allProductCategories).map(async (category) => {
                const productList = await api.get(`product?category=${category}`);
                console.log("productList:", productList)
                return productList.products;
                
            }));
            
            setProducts(productsInCategory);
        })();

    },[]);
    return (
        <Grid container>
            {productStatsOpen ? 
                <ProductStats setOpen={setProductStatsOpen} productInfo={viewedProduct} />
            :
                <Grid item>
                <Typography variant="h3">All Products</Typography>
                    {products.map((prods) => (
                        <Grid container item>
                        {prods.map((product) => (
                            <Grid item>
                                <AdminProductCard productInfo={product} setProduct={setViewedProduct} setOpen={setProductStatsOpen} />
                            </Grid>
                        ))}
                        </Grid>
                    ))}
                </Grid>
            }
        </Grid>      
        // "hello"
    );
}

export default AllProductList;