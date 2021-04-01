import React from 'react';
import { Breadcrumbs, Divider, Grid, makeStyles, Typography } from '@material-ui/core';


const CompareProductCard = ({productInfo}) => (
    <Grid container item direction="column">
        <Grid container item direction="row">
            <Grid item>
                {/* <img src={build[comparedProduct.type].image} alt={build[comparedProduct.type].name} /> */}
            </Grid>
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

)

export default CompareProductCard;