import { AppBar, Button, Checkbox, FormControlLabel, Grid, makeStyles, Modal, Snackbar, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import BuildProductCard from '../components/buildPageComponents/BuildProductCard';
import SaveBuildModal from '../components/buildPageComponents/SaveBuildModal';
import API from '../util/API';
import { generateBuildString } from '../util/helpers';
import { StoreContext } from '../util/store';

const api = new API();

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '10%',
    },
    footerBar: {
        top: 'auto',
        bottom: 0,
        padding: '1em',
        background: 'rgb(25,25,25)',
        zIndex: 1,
    },
    standoutButton: {
        background: 'rgb(245,245,0)',
    },
}))

const BuildPage = () => {
    
    const context = React.useContext(StoreContext)
    const { build: [build]} = context;
    const { cart: [cart, setCart] } = context;
    const [buildPrice, setBuildPrice] = React.useState(0);
    // const [buildNumber, setBuildNumber] = React.useState(0);
    const [buildName, setBuildName] = React.useState('Your Custom Built PC');
    const [buildDesc, setBuildDesc] = React.useState('');
    // modal states
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successType, setSuccessType] = React.useState('');
    
    const classes = useStyles();
    const [builtByCompany, setBuiltByCompany] = React.useState(false)
    
    
    // generate and calculate the build price
    React.useEffect(() => {
        let newPrice = Object.keys(build.parts).reduce((previous, key) => {
            if(build.parts[key].price){
                previous.price += Number(build.parts[key].price);
            }
            return previous;
        }, { price: 0 });
        if (builtByCompany){
            newPrice.price += 50
        }
        setBuildPrice(newPrice.price);
    },[build, builtByCompany])
    
    
    
    const handleAddToCart = () => {
        const buildInfo = JSON.parse(JSON.stringify(build));
        buildInfo['price'] = buildPrice;
        buildInfo['buildname'] = buildName;
        buildInfo['quantity'] = 1;
        
        const updatedCart = JSON.parse(JSON.stringify(cart));
        console.log(buildInfo);
        updatedCart.push(buildInfo);
        setSuccessType('cart');
        setSuccess(true);
        setCart(updatedCart);
    }
    
    const handleSaveBuild = (event) => {
        setSuccessType('save');
        setOpen(true);
    }
    
    console.log(build)
    
    return (
    <div className={classes.root}>
        <Grid container alignItems="center" direction="column" spacing={3}>
            <Grid item>
                <Typography className="light-text" variant="h2" >Custom PC Builder</Typography>
            </Grid>
            <Grid container item direction="row">
                <Grid container item direction="column" xs={12} spacing={3}>
                    {Object.keys(build.parts).map((category) => (
                        <Grid item key={`${category}-card`}>
                            <BuildProductCard type={category} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        <AppBar position="fixed" color="primary" className={classes.footerBar}>
            <Grid container direction="row" alignItems="center" justify="space-around">
                <Grid container item direction="column" xs={2}>
                    <Grid item>
                        <Typography className="light-text" >Build Number: {`${build.id}`}</Typography>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control = {
                                <Checkbox checked={builtByCompany} onChange={() => {builtByCompany ? setBuiltByCompany(false) : setBuiltByCompany(true)}} />
                            }
                            label = "Built by Company" className="light-text"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <Typography className="light-text" variant="h3">${buildPrice.toFixed(2)}</Typography>
                </Grid>
                <Grid container item direction="row" xs={3}>
                    <Grid item xs={6}>
                        <Button className={classes.standoutButton} variant="contained" onClick={handleSaveBuild}>Save build</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className={classes.standoutButton} variant="contained" onClick={() => {handleAddToCart()}}>Add to Cart</Button>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography className="light-text" variant="caption">Dispatch will take 7-10 Business Days. If opted to be built, it will take an extra 7 business days.</Typography>
                </Grid>
            </Grid>
            <Modal open={open} onClose={() => {setOpen(false)}}>
                <SaveBuildModal build={build} setSuccess={setSuccess} setOpen={setOpen} edit={build.id === 0}/>
            </Modal>
        </AppBar>
        <Snackbar open={success} autoHideDuration={5000} onClose={() => {setSuccess(false)}}>
            <Alert severity="success">{successType === 'save' ? 'Build Successfully Saved!' : 'Build added to cart!'}</Alert>
        </Snackbar>
    </div>
    )
}

export default BuildPage;