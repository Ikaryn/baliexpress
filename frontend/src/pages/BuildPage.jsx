import { Grid, Modal, Paper, Typography } from '@material-ui/core';
import React from 'react';
import BuildProductCard from '../components/BuildProductCard';

const buildTemplate = {
    'Case': '', 
    'Motherboard':'', 
    'Video Card':'', 
    'Memory': '',
    'Storage': '',
    'Power Supply': '', 
    'CPU Cooler':''
    };

const BuildPage = () => {


    return (
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
            <Grid container item xs={4}>
                <Paper>
                    <Grid item>
                        <Typography variant="h4">Overview</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>specs placeholder</Typography>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container item direction="column" xs={8} spacing={3}>
                {Object.keys(buildTemplate).map((category) => (
                    <Grid item>
                        <BuildProductCard type={category} product={buildTemplate[category]} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>
    )
}

export default BuildPage;