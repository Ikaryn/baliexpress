import { Button, Grid, Input, Typography } from '@material-ui/core';
import React from 'react';
import API from '../util/API';

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
    
    function AddProduct(){
        console.log("Add product ");
        
        const product = { 
            id: Number(id),
            name: title,
            type: category,
            // subheading: subheading,
            price: price,
            // stock: stock,
            specs: specs,
            // desc: desc,
            // warranty: warranty
            };
        console.log(product)
        const response = api.post('addProduct', product);
    }

    return(
        <Grid container item direction="column" className="information-tab">
            <Typography variant="h3">Add a product:</Typography>
            <Input onChange={(event) => {setId(event.target.value)}} placeholder="ID"   />
            <Input onChange={(event) => {setCategory(event.target.value)}} placeholder="Category" />
            <Input onChange={(event) => {setTitle(event.target.value)}} placeholder="Title" />
            <Input onChange={(event) => {setBrand(event.target.value)}} placeholder="Brand" />
            {/* <Input onChange={(event) => {setSubheading(event.target.value)}} placeholder="Subheading" /> */}
            <Input onChange={(event) => {setPrice(event.target.value)}} placeholder="Price" />
            {/* <Input onChange={(event) => {setStock(event.target.value)}} placeholder="Stock" /> */}
            <Input onChange={(event) => {setSpecs(event.target.value)}} placeholder="Specs" />
            {/* <Input onChange={(event) => {setDesc(event.target.value)}} placeholder="Description" /> */}
            {/* <Input onChange={(event) => {setWarranty(event.target.value)}} placeholder="Warranty" /> */}

            <Button onClick={() => {AddProduct()}}>Submit</Button>
        </Grid>
    )
}

export default AddProduct;