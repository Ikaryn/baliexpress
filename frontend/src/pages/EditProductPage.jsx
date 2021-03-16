import { Box, Button, Divider, Grid, Input, Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import React from 'react';
import API from '../util/API';
import {
    useHistory,
  } from 'react-router-dom';
const api = new API();

const EditProductPage = ({}) => {
    const history = useHistory();
    const { category, pid } = useParams();
    const [productInfo, setProductInfo] = React.useState({'place':'holder'});
    const [title, setTitle] = React.useState('');
    const [subheading, setSubheading] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [specs, setSpecs] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [warranty, setWarranty] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${category}`);
            console.log(products)
            const product = products.products.filter((p) => p.id === Number(pid));
            setProductInfo(product[0]);
            console.log(product[0]);
        })();
    },[category, pid])

    async function updateItem(){
        if(window.confirm('Are you sure you want to edit this product?')){
            //api call edit
            history.push(`product/${category}/${pid}`);  
        }
    }
    async function removeItem(){
        if(window.confirm('Are you sure you want to remove this product?')){
            //api call remove
            history.push('/');
        }
    }
    return(
        <div className="root">
            <Grid container item direction="column" className="information-tab">
                <Typography variant="h3">Edit Product Details:</Typography>
                <Input onChange={(event) => {}} placeholder="Title" value={productInfo.name}/>
                <Input onChange={(event) => {}} placeholder="Subheading" value={productInfo.brand} />
                <Input onChange={(event) => {}} placeholder="Price" value={productInfo.price} />
                <Input onChange={(event) => {}} placeholder="Stock" />
                <Input onChange={(event) => {}} placeholder="Specs" />
                <Input onChange={(event) => {}} placeholder="Description" />
                <Input onChange={(event) => {}} placeholder="Warranty" />

                <Button onClick={() => {updateItem()}}>Update Item</Button>
                <Button onClick={() => {removeItem()}}>Remove Item</Button>
            </Grid>
        </div>
    )
}

export default EditProductPage;