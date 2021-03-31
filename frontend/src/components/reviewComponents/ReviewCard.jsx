import { Avatar, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles((theme) => ({
    root: {
        
    }
}))

const ReviewCard = () => {
    
    const classes = useStyles();
    
    const handleVotes = async () => {
        //api url => /review/vote
    }
    
    return (
        <Grid container item direction="column" className={classes.root}>
            <Grid container item direction="row">
                <Grid container direction="row">
                    <Grid item>
                        <Avatar>placeholder</Avatar>
                    </Grid>
                    <Grid container item direction="column">
                        <Grid item>
                            <Typography>User name</Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={3} readOnly />
                        </Grid>
                    </Grid>
                </Grid>
                <Typography>3/31/2021</Typography>
            </Grid>
            <Grid item>
                <Typography>"Review comment placeholder"</Typography>
            </Grid>
            <Grid container item direction="row">
                <Grid item>
                    <Typography>x other people found this helpful</Typography>
                </Grid>
                <Grid container item direction="row">
                    <Grid item>
                        <Typography>Found this review helpful? Give it a rating!</Typography>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <IconButton>
                                <ThumbUpIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <ThumbDownIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    )

}

export default ReviewCard;