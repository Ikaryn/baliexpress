import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Grid, Grow, LinearProgress, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import API from '../../util/API';

const api = new API()

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 9em',
    },
    standoutButton: {
        background: 'rgb(245,245,0)',
    },
    progressBar: {
        height: '100%',
    },
    progressBarContainer: {
        margin: '1px 0',
    },
    closedReviewFormCardBlock: {
        position: 'relative',
        top: '-250px',
        marginTop: '10px'
    }
}))

const BarPercentages = ({ratings}) => {
    const classes = useStyles();
    
    return (
        <Grid container item direction ="column">
            {[5,4,3,2,1].map((num) => (
                <Grid container item direction="row" spacing={2} className={classes.progressBarContainer}>
                    <Grid item xs={2}>
                        <Typography variant="h6" className="light-text">{num} star</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <LinearProgress className={classes.progressBar} variant="determinate" value={num * 10} />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className="light-text">0%</Typography>
                    </Grid>
                </Grid>
            ))}       
        </Grid>
    )

} 

const ReviewBlock = ({rating, productId}) => {
    
    const [reviews, setReviews] = React.useState([{}])
    const [sort, setSort] = React.useState('popularity');
    const [filter, setFilter] = React.useState(0);
    const [reviewOpen, setReviewOpen] = React.useState(false);
    
    const classes = useStyles();
    
    const handleReviewFormOpen = () => {
        reviewOpen ? setReviewOpen(false) : setReviewOpen(true);
    }
    
    // depending on whether the form is open/closed or if user is logged in generate text for the review form button
    const generateReviewButtonText = () => {
        if (localStorage.getItem('userId')) {
            return reviewOpen ? 'Close' : 'Write a review';
        }
        
        return 'Sign in to Write a review';
    }
    
    // get reviews and users who made the reviews for the product page we're on.
    React.useEffect(() => {
        (async () => {
            console.log("PRODUCT ID", productId);
            
            // get all the reviews for the product
            const response = await api.get(`review?productId=${productId}&userId=${localStorage.getItem('userId')}`);
            console.log(response);
            
            // loop through each review and get the username for the review
            response.reviews.forEach(async (review) => {
                const options = {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Request-Type': 'profile',
                    },
                }
                const response = await api.makeAPIRequest(`profile/${review.userid}?userId=${review.userid}`, options);
                review['username']= response.accountInfo['name'];
            })

            setReviews(response.reviews);
            console.log(response.reviews);
        })();
    },[productId])
    
    return (
        <Grid container direction="column" className={classes.container} spacing={1}>
            <Grid item>
                <Typography variant="h5" className="light-text">Product Reviews</Typography>
            </Grid>
            <Grid item container direction="row">
                <Grid item container direction="column" xs={6}>
                    <Grid item container direction="row" spacing={1}>
                        <Grid item>
                            <Typography className="light-text">Rating: </Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={rating} readOnly />
                        </Grid>
                        <Grid item>
                            <Typography className="light-text">{`${rating} out of 5 stars`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <BarPercentages ratings={"dsa"} />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" className="light-text">Featured Review</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <Grid container item direction="row" justify="center">
                <Grid item xs={3}>
                    <Button 
                        variant="contained" 
                        className={classes.standoutButton} 
                        onClick={()=>{handleReviewFormOpen()}}
                        disabled={localStorage.getItem('userId' ? false : true)}
                    >
                        {generateReviewButtonText()}
                    </Button>
                </Grid>
                <Grid container item direction="row" xs={3} alignItems="center" alignContent="center">
                    <Grid item xs={2}>
                        <Typography variant="h5" className="light-text">Filter: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Select fullWidth name="Filter-dropdown" value={filter}>
                            <MenuItem value=""/>
                            {[1,2,3,4,5].map((num) => (
                                <MenuItem value={num}>{`${num} Stars`}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Grid container item direction="row" xs={3} alignItems="center" alignContent="center">
                    <Grid item xs={2}>
                        <Typography variant="h5" className="light-text">Sort: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Select fullWidth name="sort-dropdown" value={sort}>
                            <MenuItem value='popularity'>Popularity</MenuItem>
                            <MenuItem value='stars-high'>Stars High</MenuItem>
                            <MenuItem value='stars-low'>Stars low</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <div>
                <Grow in={reviewOpen}>
                    <Paper>
                        <ReviewForm productId={productId}/>
                    </Paper>
                </Grow>
            </div>
            <Grid container item direction="column" alignContent="center" className={reviewOpen ? '' : classes.closedReviewFormCardBlock} >
                {reviews && reviews.map((review) => (
                    <ReviewCard review={review} userId={localStorage.getItem('userId')}/>
                ))}
            </Grid>
        </Grid>
    
    )

}

export default ReviewBlock;