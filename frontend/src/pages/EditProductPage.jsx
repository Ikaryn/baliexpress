import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
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
            setTitle(product[0].name);
            setSubheading(product[0].brand);
            setPrice(product[0].price);
            setStock(product[0].stock);
            setSpecs(product[0].specs);
            setDesc(product[0].desc);
            setWarranty(product[0].warranty);
            console.log(product[0]);
        })();
    },[category, pid])

    async function updateItem(){
        if(window.confirm('Are you sure you want to edit this product?')){
            const options = {
                method: 'put',
                headers: { 
                    'Content-Type': 'application/json',
                    'requestType': 'edit product',
                },
                body: JSON.stringify({
                    id: pid,
                    name: title,
                    type: category,
                    subheading: subheading,
                    price: price,
                    stock: stock,
                    specs: specs,
                    desc: desc,
                    warranty: warranty
                })
            }
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`profile/${userId}`, options);
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
                body: JSON.stringify({
                    id: pid
                })
            }
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`profile/${userId}`, options);
            history.push(`/product/${category}`);
        }
    }
    return(
        <div className="root">
            <Grid container item direction="column" className="information-tab">
                <Typography variant="h3">Edit Product Details:</Typography>
                <TextField onChange={(event) => {setTitle(event.target.value)}} placeholder="Title" value={title} />
                <TextField onChange={(event) => {setSubheading(event.target.value)}} placeholder="Subheading" value={subheading} />
                <TextField onChange={(event) => {setPrice(event.target.value)}} placeholder="Price" value={price} />
                <TextField onChange={(event) => {setStock(event.target.value)}} placeholder="Stock" value={stock} />
                {/*<TextField onChange={(event) => {setSpecs(event.target.value)}} placeholder="Specs" value={specs} />*/}
                <TextField onChange={(event) => {setDesc(event.target.value)}} placeholder="Description" value={desc} />
                <TextField onChange={(event) => {setWarranty(event.target.value)}} placeholder="Warranty" value={warranty} />
                
                <Button onClick={() => {updateItem()}}>Update Item</Button>
                <Button onClick={() => {removeItem()}}>Remove Item</Button>
            </Grid>
        </div>
    )
}


export default EditProductPage;