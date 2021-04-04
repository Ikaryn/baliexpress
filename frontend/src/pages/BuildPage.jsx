import { AppBar, Button, Grid, makeStyles, Modal, Paper, rgbToHex, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import BuildProductCard from '../components/buildPageComponents/BuildProductCard';
import { generateBuildString } from '../util/helpers';
import { StoreContext } from '../util/store';

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
        marginBottom: '5%',
    },
    footerBar: {
        top: 'auto',
        bottom: 0,
        padding: '1em',
        background: 'rgb(25,25,25)',
    },
    standoutButton: {
        background: 'rgb(245,245,0)',
    },
}))

const BuildPage = () => {
    
    // const [build, setBuild] = React.useState(buildTemplate);
    const context = React.useContext(StoreContext)
    const { build: [build, setBuild]} = context;
    console.log(build);
    const [buildPrice, setBuildPrice] = React.useState(0);
    const [buildNumber, setBuildNumber] = React.useState(0);
    const classes = useStyles();
    
    // will change later.
    // generate a random unique identifer for a build
    // need to check if this is an existing build or not.
    React.useEffect(() => {
        console.log('setting build string');
        setBuildNumber(generateBuildString());
    },[])
    
    React.useEffect(() => {
        const newPrice = Object.keys(build).reduce((previous, key) => {
            if(build[key].price){
                previous.price += build[key].price;
            }
            return previous;
        }, { price: 0 });
        console.log(newPrice);
        setBuildPrice(newPrice.price);
    },[build])
    
    
    
    const handleAddToCart = () => {
    
    }
    
    const handleSaveBuild = () => {
        console.log(build);
    }
    
    
    return (
    <div className={classes.root}>
        <Grid container alignItems="center" direction="column" spacing={3}>
            <Grid item>
                <Typography className="light-text" variant="h2" >Custom Pc Builder</Typography>
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
                    {Object.keys(build).map((category) => (
                        <Grid item key={`${category}-card`}>
                            <BuildProductCard type={category} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        <AppBar position="fixed" color="primary" className={classes.footerBar}>
            <Grid container direction="row" alignItems="center" justify="space-around">
                <Grid container item direction="row" xs={2}>
                    <Typography className="light-text" >Build Number: {`${buildNumber}`}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography className="light-text" variant="h3">${buildPrice}</Typography>
                </Grid>
                <Grid container item direction="row" xs={3}>
                    <Grid item xs={6}>
                        <Button className={classes.standoutButton} variant="contained" onClick={() => {handleSaveBuild()}}>Save build</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className={classes.standoutButton} variant="contained" onClick={() => {handleAddToCart()}}>Add to Cart</Button>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography className="light-text" variant="caption">Dispatch will take 7-10 Business Days. If opted to be built, it will take an extra 7 business days.</Typography>
                </Grid>
            </Grid>
        </AppBar>
    </div>
    )
}

export default BuildPage;