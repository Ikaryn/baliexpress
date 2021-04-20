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
    const [discontinued, setDiscontinued] = React.useState(null);
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
        console.log("Product with ID", discontinued.id, "would be discontinued");

        const response = await api.delete(`product?productId=${discontinued.id}`);
        console.log(response);
        if (response.message) {

            // For each category apply the filter to remove the discontinued product
            let newProducts = []
            products.forEach((category) => {
                newProducts.push(category.filter((product) => product.id !== discontinued.id));
            });

            console.log(products);
        
            setOpenModal(false);
            setDiscontinued(null);
            setSuccess(true);
            setProducts(newProducts);
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
                                    setDiscontinued={setDiscontinued}
                                />
                            </Grid>
                        ))}
                        </Grid>
                    ))}
                <Grid item container xs={5}>
                    {discontinued &&
                        <Modal open={openModal} onClose={() => setOpenModal(false)}>
                            <Paper className="modal-container">
                                <Typography variant="h5">Are you sure you want to discontinue this product?</Typography>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={4}>
                                        <img src={"data:image/jpeg;base64," + discontinued.image} alt="product" class="product-card-image"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">{discontinued.name}</Typography>
                                        <Typography variant="h5">${discontinued.price}</Typography>
                                        <Typography variant="h5">Stock: {discontinued.stock}</Typography>
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="primary" onClick={() => {setOpenModal(false); setDiscontinued(null)}}>Cancel</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDiscontinue()}>Discontinue product</Button>
                            </Paper>    
                        </Modal>
                    }
                </Grid>
                <Snackbar open={success} autoHideDuration={1000} onClose={() => setSuccess(false)}>
                    <Alert severity="success">Product has been discontinued</Alert>
                </Snackbar>
                </Grid>
            }
        </Grid>      
    );
}

export default AllProductList;