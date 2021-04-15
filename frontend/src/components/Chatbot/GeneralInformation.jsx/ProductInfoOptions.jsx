import { Button } from '@material-ui/core';
import React from 'react';

const ProductInfoOptions = (props) => {

    const options = [
        {
            text: 'Description',
            handler: props.actionProvider.generateProductDesc,
            id: 1,
        },
        {
            text: 'Warranty',
            handler: props.actionProvider.generateProductWarranty,
            id: 2,
        },   
        {
            text: 'Shipping Info',
            handler: props.actionProvider.generateProductShippingInfo,
            id: 3,
        },
        {
            text: 'Product Specifications',
            handler: props.actionProvider.generateProductSpecs,
            id: 4,
        },   
    
    ]
    return (
        <div>
            {options.map((option) => (
                <Button
                    key={option.text + option.id}
                    variant="contained"
                    color="primary"
                    onClick={option.handler}
                >
                    {option.text}
                </Button>
            
            ))}
        </div>
    )

}

export default ProductInfoOptions;