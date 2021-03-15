import { Button, Grid, Input } from '@material-ui/core';
import React from 'react';

const AddProduct = ({}) => {
    const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [subheading, setSubheading] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [specs, setSpecs] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [warranty, setWarranty] = React.useState('');
    
    function AddProduct(){
        console.log("temp fetch backend with inputs, rerender with error or not.");
    }

    return(
        <Grid container item direction="column" className="information-tab">
            <Input onChange={(event) => {setCategory(event.target.value)}} placeholder="Category" />
            <Input onChange={(event) => {setTitle(event.target.value)}} placeholder="Title" />
            <Input onChange={(event) => {setSubheading(event.target.value)}} placeholder="Subheading" />
            <Input onChange={(event) => {setPrice(event.target.value)}} placeholder="Price" />
            <Input onChange={(event) => {setStock(event.target.value)}} placeholder="Stock" />
            <Input onChange={(event) => {setSpecs(event.target.value)}} placeholder="Specs" />
            <Input onChange={(event) => {setDesc(event.target.value)}} placeholder="Description" />
            <Input onChange={(event) => {setWarranty(event.target.value)}} placeholder="Warranty" />

            <Button onClick={() => {AddProduct()}}>Submit</Button>
        </Grid>
    )
}

export default AddProduct;