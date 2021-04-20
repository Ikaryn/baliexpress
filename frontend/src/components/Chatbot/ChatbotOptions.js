import { Button } from '@material-ui/core';
import React from 'react';

const ChatbotOptions = (props) => {
    const options = [
        {
            text: 'General Information', 
            handler: props.actionProvider.handleGeneralInfo,
            id: 1},
    ];
    
    const optionsMarkup = options.map((option) => (
        <Button color="primary" variant="contained" key={option.id} onClick={option.handler}>
            {option.text}
        </Button>
    ))
    return <div>{optionsMarkup}</div>
}

export default ChatbotOptions;