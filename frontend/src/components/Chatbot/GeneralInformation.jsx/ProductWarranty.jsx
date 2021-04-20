import { Typography } from '@material-ui/core';
import React from 'react';
import API from '../../../util/API';

const api = new API();

const ProductWarranty = (props) => {
    const { setState } = props;

    React.useEffect(() => {
        (async () => {
            const response = await api.get(`search?query=${props.productInfo}`);
            console.log(response.results[0].warranty);
            const warranty = response.results[0].warranty
            setState((state) => {
                return {...state, productWarranty: warranty}});
        })();
    },[])
    
    const renderWarranty = () => {
        return props.productWarranty
    }

    console.log(props.productWarranty);
    
    return (
        <div>
            <Typography>{renderWarranty()}</Typography>
        </div>
    )
}

export default ProductWarranty;