import { Button, Grid, Input, Typography } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import { DropzoneArea } from 'material-ui-dropzone';
import { fileToDataUrl } from '../util/helpers';
import ProductForm from './ProductForm';

const api = new API();
const AddProduct = ({}) => {
    const [id, setId] =  React.useState('');
    const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [subheading, setSubheading] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [specs, setSpecs] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [warranty, setWarranty] = React.useState('');
    const [image, setImage] = React.useState('');
    
    const [product, setProduct] = React.useState('');
    
    async function AddProduct(){
        console.log("Add product ");
        
        const product = { 
            id: Number(id),
            name: title,
            category: category,
            brand: brand,
            price: price,
            // stock: stock,
            specs: specs,
            // desc: desc,
            // warranty: warranty
            image: image
            };
        console.log(product)
        const response = await api.post('addProduct', product);
    }
    
    const handleChange = (key, value) => {
        const newProduct = JSON.parse(JSON.stringify(product));
        newProduct[key] = value;
        setProduct(newProduct);
    
    }
    
    
    const handleImageUpload = async (file) => {
        if(file.length > 0){

            console.log(file);
            const imageString = await fileToDataUrl(file[0]);
            setImage(imageString);
        }
    }

    return(
        <Grid container item direction="column" className="information-tab">
            <ProductForm />
        </Grid>
    )
}

export default AddProduct;