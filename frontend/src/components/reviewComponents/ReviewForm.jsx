import { Button, CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import API from '../../util/API';

const useStyles = makeStyles(() => ({
    root: {
        padding: '2em',
    }
}))

const api = new API()

const ReviewForm = ({productId, reviews, setReviews}) => {
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    const [query, setQuery] = React.useState('idle');
    
    const [commentError, setCommentError] = React.useState('')
    const [ratingError, setRatingError] = React.useState(false);
    
    const classes = useStyles();
    
    
    const errorHandler = () => {
        let flag = false;
        // error handling
        if (rating === 0) {
            setRatingError(true);
            flag = true;
        }
        if (comment === '') {
            setCommentError('Comment field is empty');
            flag = true;
        }
        return flag;       
    }
    
    // Submitting has an animation.
    // when after form is submitted, display a progress bar for a couple of seconds
    // then itll come up with a success message.
    const handleSubmit = async () => {
        if(!errorHandler()){
            setTimeout(() => {
                setQuery('success');
            },2000)
            setSubmitted(true);
            const review = {    rating: rating, 
                                comment: comment, 
                                userId: localStorage.getItem('userId'), 
                                productId: productId};
            const response = await api.post('review', review);
            
            const now = new Date();
            const dateString = String(now.getFullYear() + '-' +now.getDate() + '-'+now.getMonth());
            const userInfo = await api.get(`profile?userId=${localStorage.getItem('userId')}`)
            const reviewToAdd = {
                productId: productId,
                reviewdate: dateString,
                reviewId: response.reviewId,
                score: 0,
                userVote: 0,
                userId: localStorage.getItem('userId'), 
                username: userInfo.accountInfo.name,
                reviewtext: comment,
                rating: rating,
                votes: {}
            }
            const updatedReviews = JSON.parse(JSON.stringify(reviews));
            updatedReviews.push(reviewToAdd);
            setReviews(updatedReviews);
        }
    }

    return(
        <div className={classes.root}>
            {submitted ? 
                query === 'success' ?
                    <Typography>Review Submitted!</Typography>
                    :
                    <div>
                        <CircularProgress />
                    </div>
            :
            <Grid container item direction="column">
                <Grid item>
                    <Typography variant="h5">Write a Review</Typography>
                </Grid>
                <Grid item>
                    <Typography>Score</Typography>
                </Grid>
                <Grid item>
                    <Rating value={rating} onChange={(event,newValue) => {setRating(newValue);}}/>
                </Grid>
                <Grid item>
                    <Typography>Comments</Typography>
                </Grid>
                <Grid item >
                    <TextField
                        error={commentError !== ''}
                        helperText={commentError}
                        placeholder="Write your comments here..."
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        value={comment}
                        onChange={(event) => {setComment(event.target.value)}}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => {handleSubmit()}}>Submit</Button>
                </Grid>
                <Grid item>
                    {ratingError ? 
                        <Typography color="error">Please Provide a rating</Typography> 
                        : 
                        ''
                    }
                </Grid>
            </Grid>
            }
        </div>
    )
    
}

export default ReviewForm;