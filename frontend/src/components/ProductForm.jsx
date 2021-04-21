import { Step, StepLabel, Stepper, Typography, Button, Box } from '@material-ui/core';
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
    const [errorSubmit, setErrorSubmit] = React.useState(false);
    const [errorItems, setErrorItems] = React.useState([]);
    const [product, setProduct] = React.useState(productTemplate);

    React.useEffect(() => {
        (() => {
            setErrorSubmit(false);
        })();
    },[activeStep])

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

        const err = ErrorCheck()
        console.log(err)
        if(err.length !== 0){
            setErrorSubmit(true);
            setErrorItems(err);
        }else{
            console.log(product);
            const newProduct = await api.post(`product`, product);
            console.log(newProduct);
            history.push(`/product/${newProduct.product.category}/${newProduct.product.id}`);
        }
    }
    function ErrorCheck() {
        var arr = []
        for(const item in product){
            if(item === "price" && !/^[0-9]+$/.test(product[item])){
                arr.push(item);
            }else if(item === "stock" && !/^[0-9]+$/.test(product[item])){
                arr.push(item);
            }
        }
        return arr;
    }

    function makeErrorString(){
        var x = "The following items are in incorrect format: ";
        var first = true;
        for(const item in errorItems){
            if(first){
                x = x.concat(errorItems[item]);
                first = false;
            }else{
                x = x.concat(", ".concat(errorItems[item]));
            }
        }
        return x;
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
                        <Box display={errorSubmit ? "" : "none"}>
                            <Typography style={{color: "red"}}>{makeErrorString()}</Typography>
                        </Box>
                        <Button color="primary" variant="contained" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                        <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div>
                            <Button color="primary" variant="contained" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                            <Button color="primary" variant="contained" onClick={handleNext} >{activeStep === steps.length -1 ? 'finish' : 'Next'}</Button>
                        </div>
                    </div>
                )
 
                }
            </div>
        </div>
 
    )
 
}
 
export default ProductForm;