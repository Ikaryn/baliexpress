import { Step, StepLabel, Stepper, Typography, Button } from '@material-ui/core';
import React from 'react';
import { fileToDataUrl } from '../util/helpers';
import { InputForm, SpecsForm, UploadZone } from './StepperComponents';

const productTemplate = {
    'name': '',
    'brand': '',
    'price': '',
    'type': '',
    'spec': {},
    'stock': '',
    'desc': '',
    'warranty': '',

}

const ProductForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Input Product Information', 'Enter Product Specs', 'Upload an image'];
    
    const [product, setProduct] = React.useState(productTemplate);
    
    const getStepContent = (step) => {

        switch(step) {
            case 0:
                return <InputForm product={product} changeValue={changeValue}/>
            case 1:
                return <SpecsForm product={product} changeValue={changeValue}/>
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
    
    const handleImageUpload = async (file) => {
        if(file.length > 0){

            console.log(file);
            const imageString = await fileToDataUrl(file[0]);
            changeValue('image', imageString);
        }
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
                        <Button >Submit</Button>
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