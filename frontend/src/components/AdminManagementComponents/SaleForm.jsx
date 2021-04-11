import { Button, FormControl, FormHelperText, FormLabel, Grid, InputAdornment, Modal, OutlinedInput, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import API from '../../util/API';
import SearchBar from '../searchBar';

const api = new API();

const SaleProductList = ({saleProducts, setSaleProducts}) => {
    // this will contain a list of all the products user wants to set a sale for
    const [products, setProducts] = React.useState([]);
    // this will contain a list of dicts {productId, %} that will be sent to backend
    const [open, setOpen] = React.useState(false);
    
    const handleAddProduct = (product) => {
        const newProductList = JSON.parse(JSON.stringify(products));
        newProductList.push(product);
        setProducts(newProductList);
    }
    
    const handleChange = (product, value) => {
        const newSaleProducts = JSON.parse(JSON.stringify(saleProducts));
        // first check if the product already has a sale set
        // if it doesnt exist, then just push the product and the percentage
        const filteredProduct = newSaleProducts.filter((p) => (p.productId === product.id))
        console.log(filteredProduct);
        if (filteredProduct.length === 0) {
            newSaleProducts.push({'productId': product.id, 'sale %': value});
        // if it does exist just change the value
        } else {
            filteredProduct[0]['sale %'] = value;
        }
        console.log(newSaleProducts);
        setSaleProducts(newSaleProducts);
    }
    
    return (
        <Grid container item direction="column" spacing={3}>
            <Typography variant="h4">Sale Products</Typography>
            <Grid item xs={12}>
                <Paper variant="outlined">
                    <SearchBar type='sale' addProduct={handleAddProduct} />
                </Paper>
            </Grid>
            {products.map((product) => (
                <Grid container direction="row" spacing={4}>
                    <Grid item xs={2}>
                        <img className="image" src={"data:image/jpeg;base64,"+product.image} alt={product.name} />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <FormLabel>% of sale</FormLabel>
                            <OutlinedInput
                                onChange={(event) => handleChange(product, event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            ))}
        </Grid>
        )
}

      
const SaleForm = ({setSaleFormOpen}) => {
    const [name, setName] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [saleProducts, setSaleProducts] = React.useState([])
    const [success, setSuccess] = React.useState(false);

    const [dateError, setDateError] = React.useState('');
    
    const handleSubmit = async () => {

        const today = Date.now();

        if (startDate === '' || endDate === '') {
            setDateError('Start and End Dates cannot be empty');
            return;
        } else if (startDate < today) {
            setDateError('Start Date must be from today onwards');
            return;
        } else if (endDate < startDate) {
            setDateError('End Date cannot be before Start Date');
            return;
        } 

        const body = {
            'name': name,
            'start': startDate,
            'end': endDate,
            'products': saleProducts,
        };
        const response = await api.post('sales', body);
        setSuccess(true);
        setTimeout(() => {
            setSaleFormOpen(false);
        }, 1000)
    
    }
    
    return (
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <FormControl>
                        <FormLabel>Sale Name</FormLabel>
                        <OutlinedInput
                            value={name}
                            placeholder='Enter sale name'
                            onChange={(event) => {setName(event.target.value)}}
                        />
                    </FormControl>
                </Grid>
                <Grid container item direction="row" spacing={5}>
                    <Grid item>
                        <FormControl error={dateError === '' ? false : true}>
                            <FormLabel>Start Date</FormLabel>
                            <TextField
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                />
                            <FormHelperText>{dateError}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl error={dateError === '' ? false : true}>
                            <FormLabel>End Date</FormLabel>
                            <TextField
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                />
                        </FormControl>
                    </Grid>
                    <SaleProductList saleProducts={saleProducts} setSaleProducts={setSaleProducts} />
                </Grid>
                <Grid item>
                    <Button onClick={() => handleSubmit()} variant="contained" color="primary">Submit</Button>
                </Grid>
                <Snackbar open={success} autoHideDuration={1000}>
                    <Alert severity="success">Sale created!</Alert>
                </Snackbar>
            </Grid>
    )
}

export default SaleForm;