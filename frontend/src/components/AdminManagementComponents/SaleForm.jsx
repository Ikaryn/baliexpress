import { Button, FormControl, FormHelperText, FormLabel, Grid, OutlinedInput, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import API from '../../util/API';
import { fileToDataUrl } from '../../util/helpers';
import SearchBar from '../searchBar';

const api = new API();

const SaleProductList = ({saleProducts, setSaleProducts}) => {
    // this will contain a list of all the products user wants to set a sale for
    const [products, setProducts] = React.useState([]);
    
    // use this just to add the product card with % of sale
    const handleAddProduct = (product) => {
        const newProductList = JSON.parse(JSON.stringify(products));
        
        // if the product already exists dont add it
        const found = newProductList.find((p) => product.id === p.id);
        if (!found){
            newProductList.push(product);
        }
        
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
    
    // handle a product getting removed from the sale in the form.
    const handleRemove = (product) => {
        const tempProductList = JSON.parse(JSON.stringify(products));
        const tempSaleProducts = JSON.parse(JSON.stringify(saleProducts));
        
        //filter the product lists for the product we want to remove.
        const newProductList = tempProductList.filter((p) => p.id !== product.id);
        const newSaleProducts = tempSaleProducts.filter((p) => p.productId !== product.id);

        setProducts(newProductList);
        setSaleProducts(newSaleProducts);
        
    }
    
    // calculate the sale price of the product dynamically.
    const calculateSalePrice = (product) => {
        const tempProduct = saleProducts.filter((p) => p.productId === product.id);
        if (tempProduct[0]) {
            return (product.price - (product.price * (tempProduct[0]['sale %']/100)));
        }
        return product.price;
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
                <Grid container direction="row" spacing={4} alignItems="center">
                    <Grid item xs={2}>
                        <img className="image" src={"data:image/jpeg;base64,"+product.image} alt={product.name} />
                    </Grid>
                    <Grid container direction="column" item xs={8}>
                        <Grid item>
                            <Typography>{product.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Original Price: ${product.price.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Sale Price: ${calculateSalePrice(product).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <FormLabel>% of sale</FormLabel>
                            <OutlinedInput
                                onChange={(event) => handleChange(product, event.target.value)}
                            />
                        </FormControl>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            fullWidth
                            onClick={() => handleRemove(product)}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </Grid>
        )
}

      
const SaleForm = ({setSaleComponent, setSales}) => {
    const [name, setName] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [saleProducts, setSaleProducts] = React.useState([])
    const [success, setSuccess] = React.useState(false);
    const [nameError, setNameError] = React.useState('');
    const [dateError, setDateError] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [imageError, setImageError] = React.useState(false);
    const handleImageUpload = async (file) => {
        if(file.length > 0){
            console.log(file);
            const imageString = await fileToDataUrl(file[0]);
            setImage(imageString);
        }
    }
    
    const handleSubmit = async () => {
        const today = Date.now();
        if (name === '') {
            setNameError('Sale name cannot be empty');
            return;
        }
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
            'image': image,
        };
        
        console.log(body);
        const response = await api.post('sales', body);
            console.log(response);
            if(response) {
                setSuccess(true);
                setTimeout(() => {
                    setSaleComponent('table');
                }, 1000)
                setSales(response.sales)
            } else {
                setImageError(true);
            }
    }
    
    return (
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <FormControl error={nameError === '' ? false : true}>
                        <FormLabel>Sale Name</FormLabel>
                        <OutlinedInput
                            value={name}
                            placeholder='Enter sale name'
                            onChange={(event) => {setName(event.target.value)}}
                        />
                        <FormHelperText>{nameError}</FormHelperText>
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
                </Grid>
                <Grid item>
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText="Attach a Sale Banner"
                        onChange={(file) => {handleImageUpload(file); }}
                    />
                </Grid>
                <SaleProductList saleProducts={saleProducts} setSaleProducts={setSaleProducts} />
                <Grid item>
                    <Button onClick={() => handleSubmit()} variant="contained" color="primary">Submit</Button>
                </Grid>
                <Snackbar open={success} autoHideDuration={1000}>
                    <Alert severity="success">Sale created!</Alert>
                </Snackbar>
                <Snackbar open={imageError} autoHideDuration={5000} onClose={() => setImageError(false)}>
                    <Alert severity="error">Please Provide an Image</Alert>
                </Snackbar>
            </Grid>
    )
}

export default SaleForm;