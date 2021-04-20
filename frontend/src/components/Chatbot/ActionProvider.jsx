import React from 'react';
import API from '../../util/API';

const api = new API();

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }
    
    // determine whether they want info about company or product
    handleGeneralInfo = () => {
        const message = this.createChatBotMessage(
            "Great! Would you like some information about the company or a product?",
        );
        this.updateChatbotState(message);
    }
    
    // determine what info about company
    handleCompanyInfo = () => {
        const message = this.createChatBotMessage(
            'What would you like to know about the company?',
            {
                widget: 'companyInfoOptions',
            },
        );
        this.updateChatbotState(message);
    }
    
    // print out contact info
    handleContactInfo = () => {
        const message = this.createChatBotMessage(
            "Contact us at customerSupport@Baliexpress.com, or call us at 9483 8273. We are located at 123 fake street"
        );
        this.updateChatbotState(message);
    }
    
    // print out returns info
    handleReturns = () => {
        const message = this.createChatBotMessage(
            "We do not accept returns. If you have a problem with a product, please contact the manufacturing company."
        );
        this.updateChatbotState(message);
        
    }
    
    // determine which product they want to find info on
    handleProductEntryPoint = () => {
        const message = this.createChatBotMessage(
            "Which product would you like information on?"
        );
        this.updateChatbotState(message);
    }
    
    // determine which information they want to know about product
    handleProductOptions = (product) => {
        const message = this.createChatBotMessage(
            "What about the product would you like to know?",
            {
                widget: 'productInfoOptions',
            }
        );
        console.log(product)
        this.updateChatbotState(message, product);
    }
    
    generateProductWarranty = () => {
        const message = this.createChatBotMessage(
            "Product warranty is ",
            {
                widget: 'productWarranty'
            }
        )
        this.updateChatbotState(message);
    
    }
    generateProductDesc = () => {
        const message = this.createChatBotMessage(
            "Product Description is ",
            {
                widget: 'productDesc'
            }
        )
        this.updateChatbotState(message);
    
    }
    generateProductShippingInfo = () => {
        const message = this.createChatBotMessage(
            "Product Shipping information is ",
            {
                widget: 'productShippingInfo'
            }
        )
        this.updateChatbotState(message);
    
    }
    generateProductSpecs = () => {
        const message = this.createChatBotMessage(
            "Product Specifications are  ",
            {
                widget: 'productSpecs'
            }
        )
        this.updateChatbotState(message);
    
    }
    
    generateProductShippingInfo = () => {
        const message = this.createChatBotMessage(
            "Individual Components:\nAustralia - 2-5 business days\nInternational - 5-10 business days\nCustom Build PC's:\nAustralia - 14-17 business days\nInternational -19-22 buiness days",
        )
        this.updateChatbotState(message);
    }
    
    // update the state to have all of the messages
    updateChatbotState(message, product = '') {
        if(product !== '') {
            this.setState((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, message],
                productInfo: product,
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, message],
            }));
        }
    }
    
    
    
}

export default ActionProvider;