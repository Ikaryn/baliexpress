import { Button, Grid, Modal, Paper, Snackbar, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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
    const [openModal, setOpenModal] = React.useState(false);
    const [discontinuedId, setDiscontinuedId] = React.useState();
    const [success, setSuccess] = React.useState(false);
    
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

    const handleDiscontinue = async () => {
        console.log("Product with ID", discontinuedId, "would be discontinued");

        const response = await api.delete(`product?productId=${discontinuedId}`);
        console.log(response);
        if (response.message) {

            const newProducts = products.filter((product) => product.id !== discontinuedId);

            setProducts(newProducts);
            setOpenModal(false);
            setDiscontinuedId();
            setSuccess(true);
        }
    }

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
                                <AdminProductCard 
                                    productInfo={product} 
                                    setProduct={setViewedProduct} 
                                    setOpen={setProductStatsOpen} 
                                    setOpenModal={setOpenModal}
                                    setDiscontinuedId={setDiscontinuedId}
                                />
                            </Grid>
                        ))}
                        </Grid>
                    ))}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Paper>
                        <Typography>Hello There</Typography>
                        <Typography>Are you sure you want to discontinue this product?</Typography>
                        <Button variant="primary" onClick={() => handleDiscontinue()}>Yeah go for it</Button>
                    </Paper>    
                </Modal>
                <Snackbar open={success} autoHideDuration={1000} onClose={() => setSuccess(false)}>
                    <Alert severity="success">Product has been discontinued</Alert>
                </Snackbar>
                </Grid>
            }
        </Grid>      
    );
}

export default AllProductList;