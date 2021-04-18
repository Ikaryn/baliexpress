import React from 'react';
import API from '../../util/API';
import {  Button, Grid, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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
            {reviews.map((review) => (
                <Grid item className="light-text">
                    <ReportedReviewCard reportedReview={review} reviews={reviews} setReviews={setReviews}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ReportedReviewsList