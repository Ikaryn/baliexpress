import { Button, FormControl, FormLabel, Grid, InputAdornment, Modal, OutlinedInput, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import SearchBar from '../searchBar';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}
  
function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const SaleProductList = () => {
    // this will contain a list of all the products user wants to set a sale for
    const [products, setProducts] = React.useState([]);
    // this will contain a list of dicts {productId, %} that will be sent to backend
    const [saleProducts, setSaleProducts] = React.useState([])
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
            console.log(value);
            for(let i in newSaleProducts){
                if(newSaleProducts[i].productId === product.id)  newSaleProducts[i]['sale %'] = value;
            }
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

      
const SaleForm = () => {
    const [name, setName] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    
    
    return (
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <FormControl>
                        <FormLabel>Sale Name</FormLabel>
                        <OutlinedInput
                            value={name}
                            placeholder='Enter sale name'
                        />
                    </FormControl>
                </Grid>
                <Grid container item direction="row" spacing={5}>
                    <Grid item>
                        <FormControl>
                            <FormLabel>Start Date</FormLabel>
                            <TextField
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <FormLabel>End Date</FormLabel>
                            <TextField
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                />
                        </FormControl>
                    </Grid>
                    <SaleProductList />
                </Grid>
            </Grid>
    )
}

export default SaleForm;