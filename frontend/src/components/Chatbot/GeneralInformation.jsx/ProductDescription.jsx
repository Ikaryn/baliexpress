import { Typography } from '@material-ui/core';
import React from 'react';
import API from '../../../util/API';

const api = new API();

const ProductDescription = (props) => {
    const { setState } = props;

    React.useEffect(() => {
        (async () => {
            if(props.productInfo) {
                const response = await api.get(`search?query=${props.productInfo}`);
                setState((state) => {
                    return {...state, productDesc: response.results[0].description}});
                }
        })();
    },[])
    
    const renderDescription = () => {
        if(props.productDesc) {
            return props.productDesc
        } else {
            return "Please Specify a product first."
        }
    }

    console.log(props.productDesc);
    
    return (
        <div>
            <Typography>{renderDescription()}</Typography>
        </div>
    )
}

export default ProductDescription;