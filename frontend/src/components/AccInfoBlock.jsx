import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';


const AccInfoblock = ({name, email, phone}) => {

    return (
    <Grid container item direction="column">
        <Grid item>
            <Typography variant="h3">Account information</Typography>
        </Grid>
        <Grid container item direction="row">
            <Grid item>
                <Typography variant="body2">Name:</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{name}</Typography>
            </Grid>
        </Grid>
        <Grid container item direction="row">
            <Grid item>
                <Typography variant="body2">Email:</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{email}</Typography>
            </Grid>
        </Grid>
        <Grid container item direction="row">
            <Grid item>
                <Typography variant="body2">Phone:</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">{phone}</Typography>
            </Grid>
        </Grid>
    </Grid>
    );

}

export default AccInfoblock;