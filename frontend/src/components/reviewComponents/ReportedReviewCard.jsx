import { Grid, Snackbar, makeStyles, Typography, Button, Paper } from '@material-ui/core';
import React from 'react';
import API from '../../util/API';
import Alert from '@material-ui/lab/Alert';
import '../styles/profilePage.css';

const api = new API()

const useStyles = makeStyles(() => ({
    title: {
        // fontSize: 24,
        fontWeight: 'bold',
    },
    
    productname: {
        fontWeight: 'bold'
    },

    underline: {
        textDecoration: 'underline'
    },
    card: {
        border: '1px solid grey',
        paddingBottom: '1em',
        paddingLeft: '1em',
    },
    reviewQuote: {
        padding: '1em',
    }
}))

const ReportedReviewCard = ({reportedReview, reviews, setReviews}) => {
    const classes = useStyles();
    const [success, setSuccess] = React.useState(false);

    const handleRemove = (reviewid) => {
        const body = {reviewId: reviewid};
        api.delete('review', body);
        setSuccess(true);
        const tempReviews = JSON.parse(JSON.stringify(reviews));
        const newReviews = tempReviews.filter(tempR => tempR.reviewid !== reviewid);
        setReviews(newReviews)
    }

    const handleDismiss = (reviewid) => {
        const body = {reviewId: reviewid};
        api.delete('review/reports', body);
        const tempReviews = JSON.parse(JSON.stringify(reviews));
        const newReviews = tempReviews.filter(tempR => tempR.reviewid !== reviewid);
        setReviews(newReviews)
    }

    return (
        <Grid container direction="column" className={classes.card}>
                <Grid item>
                    <Typography className={classes.productname} variant="h5">{reportedReview.productname}</Typography>
                </Grid>
            <Grid container item justify="center" className={classes.reviewQuote}>
                <Grid item>
                    <Typography>"{reportedReview.reviewtext}"</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography className={classes.underline}>This review was reported:</Typography>
                </Grid>
                <Grid container direction="column">
                    <Grid item>
                        <Typography>{reportedReview.harassment} times for harassment.</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{reportedReview.offensive} times for being offensive.</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{reportedReview.irrelevant} times for being irrelevant.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item>
                    <Button 
                    color="primary" 
                    variant="contained"
                    onClick={() => {handleRemove(reportedReview.reviewid)}}
                    >
                        Remove Review
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                    color="primary" 
                    variant="contained"
                    onClick={() => {handleDismiss(reportedReview.reviewid)}}
                    >
                        Dismiss
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={success} autoHideDuration={1000}>
                <Alert severity="success">This review has been deleted</Alert>
            </Snackbar>
        </Grid>
    )
}

export default ReportedReviewCard