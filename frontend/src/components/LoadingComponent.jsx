import { CircularProgress, Grid, LinearProgress } from '@material-ui/core';
import React from 'react';

const LoadingComponent = () => 
(
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
)

export default LoadingComponent;

