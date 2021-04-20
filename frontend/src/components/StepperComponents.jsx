import { FormControl, Grid, Input, InputLabel, Select, Typography, TextField } from '@material-ui/core';
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
'Graphics_Cards',
'Monitor',
'Mouses',
'Keyboards'
]

const api = new API();

function checkNum(val) {
    return /^[0-9]+$/.test(val);
}

const InputForm = ({product, changeValue}) => {
    console.log(product);
    return (
    <Grid container spacing={3}>
        <Typography variant="h3">Product Information</Typography>
        <Grid item xs={12}>
            <TextField 
                onChange={(event) => {changeValue('name', event.target.value)}} 
                placeholder="Title" 
                value={product.name} 
                fullWidth
            />
        </Grid>
        <Grid item >
            <TextField 
                onChange={(event) => {changeValue('brand', event.target.value)}} 
                placeholder="Brand" 
                value={product.brand} 
                
                />
        </Grid>
        <Grid item>
            <TextField 
                onChange={(event) => {changeValue('price', event.target.value)}} 
                placeholder="Price" 
                value={product.price}
                />
        </Grid>
        <Grid item xs={9}>
            <TextField 
                onChange={(event) => {changeValue('description', event.target.value)}} 
                placeholder="Description" 
                value={product.description} 
                fullWidth
                />
        </Grid>
        <Grid item xs={3}>
        <FormControl>
            <InputLabel>Product type</InputLabel>
            <Select native value={product.category} onChange={(event) => {changeValue('category', event.target.value)}}>
                {product.category === '' ? <option value="" disabled></option> : product.category}
                {productCategories.map((category) => (
                    <option value={category}>{category}</option>
                    ))}
            </Select>
        </FormControl>
        </Grid>
        <Grid item>
            <TextField 
                onChange={(event) => {changeValue('stock', event.target.value)}} 
                placeholder="Stock" 
                value={product.stock} 
                />
        </Grid>
        <Grid item>
            <TextField 
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
            const products = await api.get(`product?category=${product.category}`);
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
                    <TextField value={product[key]} onChange={(event) => {changeValue(key, event.target.value)}} />
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