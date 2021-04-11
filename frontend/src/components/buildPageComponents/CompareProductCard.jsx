import React from 'react';
import { Breadcrumbs, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import dataVis from '../../util/DataVis';

const useStyles = makeStyles({
    performanceGraph: {
        width: '100%',
        height: '90%',
    },
    image: {
        width: '100%',
    }
})

const CompareProductCard = ({productInfo, type}) => {
    console.log('hello');
    const productComparison = new dataVis();
    const classes = useStyles();
    // const [product, setProduct] = React.useState(productInfo);
    const [performance, setPerformanace] = React.useState(
        productComparison.generateProductPerformance(productInfo));
    
    
    console.log(performance, productInfo);
    return (
    <Grid container item direction="column" justify="space-between">
        <Grid item>
            <Typography className="light-text" variant='h6'>{productInfo.name}</Typography>
        </Grid>
        <Grid container item direction="column" spacing={2}>
            <Grid item >
                <img className={classes.image} src={"data:image/jpeg;base64,"+ productInfo.image} alt={productInfo.name} />
            </Grid>
            {performance && <Grid container item direction="column" >
                <Grid item>
                    <Typography variant="h5" className="light-text">Performance</Typography>
                </Grid>
                {Object.keys(performance).map((field) => (
                    <Grid item container direction="row" key={field}>
                        <Grid item xs={3}>
                            <Typography className="light-text">{field}:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {/* <Typography>{performance[field]}</Typography> */}
                            <LinearProgress className={classes.performanceGraph} variant="determinate" value={performance[field]} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            }
        </Grid>
        <Grid item>
            <Divider light/>
        </Grid>
        <Grid container direction="column" item alignItems="center">
            <Grid item>
                <Typography className="light-text" variant="h4">${productInfo.price}</Typography>
            </Grid>
        </Grid>
        <Grid container direction="column" item alignItems="center">
            <Grid item>
                <Typography className="light-text">Specifications</Typography>
            </Grid>
        </Grid>
        <Grid item>
            {Object.keys(productInfo.specs).map((key) => (
                <Grid item container direction="row" justify="space-between">
                    <Grid item>
                        <Typography className="light-text" variant="h6">{key}:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className="light-text" variant="h6">{productInfo.specs[key]}</Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </Grid>
    )

}

export default CompareProductCard;