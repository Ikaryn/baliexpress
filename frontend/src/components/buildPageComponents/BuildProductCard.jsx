import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardMedia, Divider, Grid, makeStyles, Modal, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import SelectBuildProductModal from './SelectBuildProductModal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    productInfoContainer: {
        padding: theme.spacing(2)
    }

}));

const BuildProductCard = ({type, product, setBuild}) => {
    
    const [open, setOpen] = React.useState(false);
    const [productInfo, setProductInfo] = React.useState(product);
    
    console.log(productInfo);
    const classes = useStyles();
    
    React.useEffect(() => {
        if (productInfo !== '') {
            setBuild(type, productInfo);
        }
    },[productInfo, setBuild, type]);
    
    return (
        <Card>
            <Grid container item direction="row">
                <Grid container item xs={2} direction="column" alignItems="center" alignContent="center">
                    <Grid item>
                        <Typography variant="h5">{type}</Typography>
                    </Grid>
                    <Grid item>
                        <InfoIcon />
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" />
                </Grid>
                {productInfo === '' ? 
                <Grid container item xs={9} alignItems="center" justify="center">
                    <Grid item>     
                        <Button variant="contained" onClick={() => {setOpen(true)}}>Select a Part</Button>
                    </Grid>
                </Grid>
                :
                <Grid item container direction="row" xs={9} spacing={4} className={classes.productInfoContainer}>
                    <Grid item xs={2}>
                        <img src={productInfo.image} alt={productInfo.name}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Specs</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container item direction="column">
                                {Object.keys(productInfo.specs).map((spec) => (
                                    <Grid container item direction="row">
                                        <Grid item>
                                            <Typography>{spec}:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>{productInfo.specs[spec]}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item container direction="column" xs={3}>
                        <Grid item>             
                            <Typography variant="h6">Product Name</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{productInfo.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" xs={2}>
                        <Grid item>             
                            <Typography variant="h6">Price</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">${productInfo.price}.00</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" xs={1}>
                        <Button variant="contained" onClick={()=>{setOpen(true)}}>Compare</Button>
                        <Button variant="contained" onClick={()=>{setOpen(true)}}>Change</Button>
                        <Button variant="contained" onClick={()=>{setProductInfo('')}}>Delete</Button>
                    </Grid>
                </Grid>
                }
            </Grid>
            <Modal open={open} onClose={() => {setOpen(false)}}>
                <SelectBuildProductModal category={type} setOpen={setOpen} setProduct={setProductInfo}/>
            </Modal>
        </Card>
    
    );

}

export default BuildProductCard;