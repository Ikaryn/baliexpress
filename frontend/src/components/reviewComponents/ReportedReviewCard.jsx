import { Grid, Snackbar, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import API from '../../util/API';
import Alert from '@material-ui/lab/Alert';
import '../styles/profilePage.css';

const api = new API()

const useStyles = makeStyles(() => ({
    title: {
        fontWeight: 'bold'
    },

    underline: {
        textDecoration: 'underline'
    },
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

    return (
        <Grid container>
            <Grid item>
                <Typography className={classes.title} >{reportedReview.productname}</Typography>
            </Grid>
            <Grid item>
                <Typography>"{reportedReview.reviewtext}"</Typography>
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
            <Grid item>
                <Button 
                color="primary" 
                variant="contained"
                onClick={() => {handleRemove(reportedReview.reviewid)}}
                >
                    Remove Review
                </Button>
            </Grid>
            <Snackbar open={success} autoHideDuration={1000}>
                <Alert severity="success">This review has been deleted</Alert>
            </Snackbar>
        </Grid>
    )
}

export default ReportedReviewCard