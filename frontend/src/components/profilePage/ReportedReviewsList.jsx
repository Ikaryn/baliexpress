import React from 'react';
import API from '../../util/API';
import {  Button, Divider, Grid, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import ReportedReviewCard from '../reviewComponents/ReportedReviewCard';
const api = new API();


const ReportedReviewsList = () => {
    const [reviews, setReviews] = React.useState([]);
    
    React.useEffect(() => {
        (async () => {
            const response = await api.get('review/reports')
            console.log(response)
            setReviews(response)
        })();
    },[]);


    return(
        <Grid container item direction="column" className="information-tab">
            <Grid item container justify="center">
                <Grid item>
                    <Typography variant="h3">Reported Reviews</Typography>
                </Grid>
            </Grid>
            {reviews.map((review) => (
                <Grid item className="light-text">
                    <ReportedReviewCard reportedReview={review} reviews={reviews} setReviews={setReviews}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ReportedReviewsList