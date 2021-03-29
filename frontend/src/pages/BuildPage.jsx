import { AppBar, Button, Grid, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import React from 'react';
import BuildProductCard from '../components/buildPageComponents/BuildProductCard';
import { generateBuildString } from '../util/helpers';

const buildTemplate = {
    'Case': '', 
    'Motherboard':'', 
    'Graphics Card':'', 
    'Memory': '',
    'Storage': '',
    'Power Supply': '', 
    'CPU Cooler':''
    };

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '5%'
    },
    footerBar: {
        top: 'auto',
        bottom: 0,
        padding: '1em'
    }
}))

const BuildPage = () => {

    const [build, setBuild] = React.useState(buildTemplate);
    const [buildPrice, setBuildPrice] = React.useState(0);
    const [buildNumber, setBuildNumber] = React.useState(0);
    const classes = useStyles();
    
    // will change later.
    // generate a random unique identifer for a build
    // need to check if this is an existing build or not.
    React.useEffect(() => {
        setBuildNumber(generateBuildString());
    },[])
    
    const handleChangeProduct = (type, product) => {
        const newBuild = JSON.parse(JSON.stringify(build));
        newBuild[type] = product;
        setBuild(newBuild);
        console.log(newBuild);
        
        // loop through the build and sum all the prices
        const newPrice = Object.keys(newBuild).reduce((previous, key) => {
            if(newBuild[key].price){
                previous.price += newBuild[key].price;
            }
            return previous;
        }, { price: 0 });
        console.log(newPrice);
        setBuildPrice(newPrice.price);
    }
    
    const handleAddToCart = () => {
    
    }
    
    const handleSaveBuild = () => {
        console.log(build);
    }
    
    return (
    <div className={classes.root}>
        <Grid container alignItems="center" direction="column" spacing={3}>
            <Grid item>
                <Typography variant="h2">Custom Pc Builder</Typography>
            </Grid>
            <Grid item>
                <Paper>
                    <Typography>Sort placeholder</Typography>
                </Paper>
            </Grid>
            <Grid container item direction="row">
                <Grid container item xs={2}>
                    <Paper>
                        <Grid item>
                            <Typography variant="h4">Overview</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>specs placeholder</Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container item direction="column" xs={10} spacing={3}>
                    {Object.keys(buildTemplate).map((category) => (
                        <Grid item>
                            <BuildProductCard type={category} product={buildTemplate[category]} setBuild={handleChangeProduct}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        <AppBar position="fixed" color="primary" className={classes.footerBar}>
            <Grid container direction="row" alignItems="center" justify="space-around">
                <Grid container item direction="row" xs={2}>
                    <Typography>Build Number: {`${buildNumber}`}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h3">${buildPrice}</Typography>
                </Grid>
                <Grid container item direction="row" xs={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={() => {handleSaveBuild()}}>Save build</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={() => {handleAddToCart()}}>Add to Cart</Button>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="caption">Dispatch will take 7-10 Business Days. If opted to be built, it will take an extra 7 business days.</Typography>
                </Grid>
            </Grid>
        </AppBar>
    </div>
    )
}

export default BuildPage;