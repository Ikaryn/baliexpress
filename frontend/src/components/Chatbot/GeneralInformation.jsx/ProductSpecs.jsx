import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import API from '../../../util/API';

const api = new API();

const ProductSpecs = (props) => {
    const { setState } = props;

    React.useEffect(() => {
        (async () => {
            if(props.productInfo) {
                const response = await api.get(`search?query=${props.productInfo}`);
                console.log(response.results[0].specs);
                setState((state) => {
                    return {...state, productSpecs: response.results[0].specs}});
            }
        })();
    },[])
    
    const renderSpecs = () => (
        props.productSpecs ? 
            Object.keys(props.productSpecs).map((key) => (
            <Grid item container direction="row" justify="space-between">
                <Grid item>
                    <Typography variant="h6">{key}:</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">{props.productSpecs[key]}</Typography>
                </Grid>
            </Grid>))
            :
            <Typography>Please Specify a product first.</Typography> 
    )
            
    return (
        <div>
            {renderSpecs()}
        </div>
    )
}

export default ProductSpecs;