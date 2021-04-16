import { Button } from '@material-ui/core';
import React from 'react';

const CompanyInfoOptions = (props) => {
    const options = [
        {
            text: 'Contact Info',
            handler: props.actionProvider.handleContactInfo,
            id: 1,
        },
        {
            text: 'Returns',
            handler: props.actionProvider.handleReturns,
            id: 2,
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


export default CompanyInfoOptions;