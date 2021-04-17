import React from 'react';
import API from '../../util/API';
import {  Button, Grid, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import ReviewCard from '../reviewComponents/ReviewCard';
const api = new API();


const ReportedReviewsList = () => {
    const [reviews, setReviews] = React.useState([]);
    const history = useHistory();
    
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
                <Grid item>
                    <ReviewCard review={review} userId={localStorage.getItem('userId')}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ReportedReviewsList