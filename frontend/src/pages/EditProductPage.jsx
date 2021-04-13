import { Box, Button, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import React from 'react';
import API from '../util/API';
import {
    useHistory,
  } from 'react-router-dom';
import { DropzoneArea } from 'material-ui-dropzone';
import { fileToDataUrl } from '../util/helpers';

const api = new API();

const useStyles = makeStyles(() => ({

    field: {
        'margin-top': '0.5em',
    },

    label: {
        'margin-top': '1em',
        'margin-right': '1em',
    },

    title: {
        'padding': '1em',
    },

    fieldsBox: {
        'padding-left': '8em',
        'padding-right': '8em',
        'padding-bottom': '2em',
    }

}))

const EditProductPage = ({}) => {

    const history = useHistory();
    const classes = useStyles();
    const { category, pid } = useParams();
    const [productInfo, setProductInfo] = React.useState({'place':'holder'});
    const [image, setImage] = React.useState('');
    
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product?category=${category}`);
            console.log(products)
            const product = products.products.filter((p) => Number(p.id) === Number(pid));
            setProductInfo(product[0]);
            console.log(productInfo);
            console.log(product);
        })();
    },[category, pid])

    async function updateItem(){
        if(window.confirm('Are you sure you want to edit this product?')){

            const res = await api.put(`product`, productInfo);
            console.log(res);
            history.push(`/product/${category}/${pid}`);  
        }
    }
    async function removeItem(){
        if(window.confirm('Are you sure you want to remove this product?')){

            console.log('product-info:', productInfo)
            const res = await api.delete(`product`, productInfo);
            history.push(`/product/${category}`);
        }
    }
    
    const handleImageUpload = async (file) => {
        if(file.length > 0){

            console.log(file);
            const imageString = await fileToDataUrl(file[0]);
            setImage(imageString);
            changeValue('image', imageString);
        }
    }
    
    const changeValue = (key, value) => {
        const newProduct = JSON.parse(JSON.stringify(productInfo));
        newProduct[key] = value;
        console.log(newProduct);
        console.log(productInfo);
        setProductInfo(newProduct);
    }

    const changeSpecsValue = (key, value) => {
        const newSpecs = JSON.parse(JSON.stringify(productInfo.specs));
        newSpecs[key] = value;
        changeValue('specs', newSpecs);
    }

    const fields =  {
                        'name': "Title",
                        'brand': "Brand",
                        'price': "Price",
                        'stock': "Stock",
                        'desc': "Description",
                        'warranty': "Warranty"
                    };
    
    return(
        <Grid container item direction="column" className="information-tab" className="light-text">
            <Grid container justify="center">
                <Typography variant="h3" className={classes.title}>Edit Product Details</Typography>
            </Grid>
            <Grid container direction="row" justify="center">
                <Grid item container xs={6} alignContent="flex-start" justify="flex-end" className={classes.fieldsBox}>
                    <Grid container justify="flex-end">
                        <Typography variant="h4">General Information</Typography>
                    </Grid>
                    <Grid item>
                        {Object.keys(fields).map((label, value) => (
                            <Grid item container className={classes.label}>
                                <Typography>{fields[label]}:</Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item>
                        {Object.keys(fields).map((label, value) => (
                            <Grid item container className={classes.field}>
                                <TextField onChange={(event) => {changeValue(label, event.target.value)}} value={productInfo[label]} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item container xs={6} alignContent="flex-start" className={classes.fieldsBox}>
                    <Grid container>
                        <Typography variant="h4">Specifications</Typography>
                    </Grid>
                    <Grid item>
                        {productInfo.specs && Object.keys(productInfo.specs).map((label) => (
                            <Grid item container className={classes.label}>
                                <Typography>{label}:</Typography>
                            </Grid>
                        ))}
                    </Grid>
                     <Grid item>
                        {productInfo.specs && Object.keys(productInfo.specs).map((label) => (
                            <Grid item container className={classes.field}>
                                <TextField onChange={(event) => {changeSpecsValue(label, event.target.value)}} value={productInfo.specs[label]} />
                            </Grid>
                        ))}
                     </Grid>
                </Grid>
            </Grid>
            <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText="Set product image thumbnail"
                onChange={(file) => {handleImageUpload(file); }}
            
            />
            <Button onClick={() => {updateItem()}}>Update Item</Button>
            <Button onClick={() => {removeItem()}}>Remove Item</Button>
        </Grid>
    )
}


export default EditProductPage;