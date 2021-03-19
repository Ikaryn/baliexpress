import { FormControl, Grid, Input, InputLabel, Select, Typography } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import API from '../util/API';

const productCategories = ['CPU', 
'CPU Cooling', 
'PC Cooling', 
'Motherboards', 
'Storage', 
'Memory (RAM)',
'Cases',
'PSU',
'GPU',
'Monitor',
'Mouses',
'Keyboards'
]

const api = new API();

const InputForm = ({product, changeValue}) => {
    console.log(product);
    return (
    <Grid container spacing={3}>
        <Typography variant="h3">Product Information</Typography>
        <Grid item xs={12}>
            <Input 
                onChange={(event) => {changeValue('name', event.target.value)}} 
                placeholder="Title" 
                value={product.name} 
                fullWidth
            />
        </Grid>
        <Grid item >
            <Input 
                onChange={(event) => {changeValue('brand', event.target.value)}} 
                placeholder="Brand" 
                value={product.brand} 
                
                />
        </Grid>
        <Grid item>
            <Input 
                onChange={(event) => {changeValue('price', event.target.value)}} 
                placeholder="Price" 
                value={product.price} 
                />
        </Grid>
        <Grid item xs={9}>
            <Input 
                onChange={(event) => {changeValue('desc', event.target.value)}} 
                placeholder="Description" 
                value={product.desc} 
                fullWidth
                />
        </Grid>
        <Grid item xs={3}>
        <FormControl>
            <InputLabel>Product type</InputLabel>
            <Select native value={product.type} onChange={(event) => {changeValue('type', event.target.value)}}>
                {product.type === '' ? <option value="" disabled></option> : product.type}
                {productCategories.map((category) => (
                    <option value={category}>{category}</option>
                    ))}
            </Select>
        </FormControl>
        </Grid>
        <Grid item>
            <Input 
                onChange={(event) => {changeValue('stock', event.target.value)}} 
                placeholder="Stock" 
                value={product.stock} 
                />
        </Grid>
        <Grid item>
            <Input 
                onChange={(event) => {changeValue('warranty', event.target.value)}} 
                placeholder="Warranty" 
                value={product.warranty} 
                />
        </Grid>
    </Grid>);
}

const SpecsForm = ({product, changeValue}) => {
    
    const [specs, setSpecs] = React.useState({'':''});
    
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${product.type}`);
            if (products) {
                setSpecs(products.products[0].specs);
            }
        })();
    
    },[product.type])
    
    return (
        <Grid>
            {Object.keys(specs).map((key) => (
                <Grid item > 
                    <Typography>{key}:</Typography>
                    <Input value={product[key]} onChange={(event) => {changeValue(key, event.target.value)}} />
                </Grid>

            ))}
        </Grid>
    );
}

const UploadZone = ({product, handleImageUpload}) => {
    return (
        <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText="Set product image thumbnail"
        onChange={(file) => {handleImageUpload(file); }}
    />
    
    )
}

export {
    InputForm,
    SpecsForm,
    UploadZone
}