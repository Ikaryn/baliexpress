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
            type: category,
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
            {/* <Typography variant="h3">Add a product:</Typography> */}
            {/* <Input onChange={(event) => {setId(event.target.value)}} placeholder="ID"   /> */}
            {/* <Input onChange={(event) => {setCategory(event.target.value)}} placeholder="Category" /> */}
            {/* <Input onChange={(event) => {setTitle(event.target.value)}} placeholder="Title" /> */}
            {/* <Input onChange={(event) => {setBrand(event.target.value)}} placeholder="Brand" /> */}
            {/* <Input onChange={(event) => {setSubheading(event.target.value)}} placeholder="Subheading" /> */}
            {/* <Input onChange={(event) => {setPrice(event.target.value)}} placeholder="Price" /> */}
            {/* <Input onChange={(event) => {setStock(event.target.value)}} placeholder="Stock" /> */}
            {/* <Input onChange={(event) => {setSpecs(event.target.value)}} placeholder="Specs" /> */}
            {/* <Input onChange={(event) => {setDesc(event.target.value)}} placeholder="Description" /> */}
            {/* <Input onChange={(event) => {setWarranty(event.target.value)}} placeholder="Warranty" /> */}
            
            {/* <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText="Set product image thumbnail"
                onChange={(file) => {handleImageUpload(file); }}
            />
                

            <Button onClick={() => {AddProduct()}}>Submit</Button> */}
            <ProductForm />
        </Grid>
    )
}

export default AddProduct;