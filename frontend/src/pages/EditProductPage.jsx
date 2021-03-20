import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import React from 'react';
import API from '../util/API';
import {
    useHistory,
  } from 'react-router-dom';
import { DropzoneArea } from 'material-ui-dropzone';
import { fileToDataUrl } from '../util/helpers';
const api = new API();
const EditProductPage = ({}) => {
    const history = useHistory();
    const { category, pid } = useParams();
    const [productInfo, setProductInfo] = React.useState({'place':'holder'});
    const [image, setImage] = React.useState('');
    
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${category}`);
            console.log(products)
            const product = products.products.filter((p) => Number(p.id) === Number(pid));
            setProductInfo(product[0]);
        })();
    },[category, pid])

    async function updateItem(){
        if(window.confirm('Are you sure you want to edit this product?')){
            const options = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'request-type': 'edit product',
                },
                body: JSON.stringify(productInfo)
            }

            console.log("Options", options)
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`product/${category}/${pid}`, options);
            console.log(res);
            history.push(`/product/${category}/${pid}`);  
        }
    }
    async function removeItem(){
        if(window.confirm('Are you sure you want to remove this product?')){
            const options = {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productInfo)
            }
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`/product/${category}/${pid}`, options);
            history.push(`/product/${category}`);
        }
    }
    
    const handleImageUpload = async (file) => {
        if(file.length > 0){

            console.log(file);
            const imageString = await fileToDataUrl(file[0]);
            setImage(imageString);
        }
    }
    
    const changeValue = (key, value) => {
        const newProduct = JSON.parse(JSON.stringify(productInfo));
        newProduct[key] = value;
        console.log(newProduct);
        console.log(productInfo);
        setProductInfo(newProduct);
    }
    
    return(
        <div className="root">
            <Grid container item direction="column" className="information-tab">
                <Typography variant="h3">Edit Product Details:</Typography>
                <TextField onChange={(event) => {changeValue('name', event.target.value)}} placeholder="Title" value={productInfo.name} />
                <TextField onChange={(event) => {changeValue('brand', event.target.value)}} placeholder="Subheading" value={productInfo.brand} />
                <TextField onChange={(event) => {changeValue('price', event.target.value)}} placeholder="Price" value={productInfo.price} />
                <TextField onChange={(event) => {changeValue('stock', event.target.value)}} placeholder="Stock" value={productInfo.stock} />
                {/*<TextField onChange={(event) => {setSpecs(event.target.value)}} placeholder="Specs" value={specs} />*/}
                <TextField onChange={(event) => {changeValue('desc', event.target.value)}} placeholder="Description" value={productInfo.desc} />
                <TextField onChange={(event) => {changeValue('warranty', event.target.value)}} placeholder="Warranty" value={productInfo.warranty} />
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText="Set product image thumbnail"
                    onChange={(file) => {handleImageUpload(file); }}
                
                />
                <Button onClick={() => {updateItem()}}>Update Item</Button>
                <Button onClick={() => {removeItem()}}>Remove Item</Button>
            </Grid>
        </div>
    )
}


export default EditProductPage;