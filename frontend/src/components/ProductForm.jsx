import { Step, StepLabel, Stepper, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import API from '../util/API';
import { fileToDataUrl } from '../util/helpers';
import { InputForm, SpecsForm, UploadZone } from './StepperComponents';
 
const productTemplate = {
    'name': '',
    'brand': '',
    'price': '',
    'category': '',
    'specs': {},
    'stock': '',
    'description': '',
    'warranty': '',
 
}
 
const api = new API();
 
const ProductForm = ({type}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Input Product Information', 'Enter Product Specs', 'Upload an image'];
 
    const [product, setProduct] = React.useState(productTemplate);
 
    const getStepContent = (step) => {
 
        switch(step) {
            case 0:
                return <InputForm product={product} changeValue={changeValue}/>
            case 1:
                return <SpecsForm product={product} changeValue={changeKeyValue}/>
            case 2:
                return <UploadZone product={product} handleImageUpload={handleImageUpload}/>
            default:
                return '';
        }
    }
 
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
 
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
 
    const changeValue = (key,value) => {
        const newProduct = JSON.parse(JSON.stringify(product));
        newProduct[key] = value;
        setProduct(newProduct);
        console.log(key,value)
 
    }

    const changeKeyValue = (key,value) => {
        const newProduct = JSON.parse(JSON.stringify(product));
        newProduct['specs'][key] = value;
        setProduct(newProduct);
        console.log(key,value)
 
    }
 
    const handleImageUpload = async (file) => {
        if(file.length > 0){
 
            console.log(file);
            const imageString = await fileToDataUrl(file[0]);
            changeValue('image', imageString);
        }
    }
    const history = useHistory();
    const handleSubmit = async () => {
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'request-type': 'edit product',
            },
            body: JSON.stringify(product)
        }
        console.log(product)
        const newProduct = await api.makeAPIRequest(`addProduct`, options);
        console.log(newProduct);
        history.push(`/product/${newProduct.product.category}/${newProduct.product.id}`); 
    }
 
    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>You're done! Click submit to finish the product!</Typography>
                        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                            <Button onClick={handleNext} >{activeStep === steps.length -1 ? 'finish' : 'Next'}</Button>
                        </div>
                    </div>
                )
 
                }
            </div>
        </div>
 
    )
 
}
 
export default ProductForm;