import { Avatar, Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, makeStyles, MenuItem, Modal, Paper, Select, Snackbar, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { useHistory } from 'react-router';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FlagIcon from '@material-ui/icons/Flag'
import API from '../../util/API';
import Alert from '@material-ui/lab/Alert';
import { StoreContext } from '../../util/store';

const api = new API()

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '2em',
        color: 'white',
    },
    reviewContainer: {
        padding: '1em 1em 0 1em',
    },
    reviewText: {
        marginBottom: '1em'
    },
    noVote: {
        fill: 'white'
    },
    upVote: {
        fill: 'rgb(106, 255, 87)'
    },
    downVote: {
        fill: 'rgb(117, 152, 255)'
    },
    reportModal: {
        position: 'absolute',
        top: '30%',
        left: '42%',
    },
    reportModalContainer: {
        padding: '1em',
    }
}))

const ReviewCard = ({review, userId, reviews, setReviews}) => {
    
    const classes = useStyles();
    const context = React.useContext(StoreContext);
    const { userType: [userType] } = context;


    const [voteStatus, setVoteStatus] = React.useState({'up': false, 'down': false})
    const history = useHistory();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [reportReason, setReportReason] = React.useState("");
    const [success, setSucccess] = React.useState(false);
    const [reportError, setReportError] = React.useState(false);
    const [reviewNumber, setReviewNumber] = React.useState(review.score);

    const handleVotes = async (type) => {
        // DON'T FORGET TO HANDLE COLOUR CHANGE
        const value = type === 'down' ? -1 : 1;
        const body = {reviewId: review.reviewid, userId: userId, vote: value};

        let up = voteStatus.up;
        let down = voteStatus.down;

        switch (type) {

            // If upvote was clicked...
            case 'up':
                // If already upvoted
                if (voteStatus['up']) {
                    await api.delete('review/vote', body);
                    up = false;
                    setReviewNumber(reviewNumber - 1 >= 0 ? reviewNumber - 1 : 0);
                // If already downvoted
                } else if (voteStatus['down']) {
                    await api.put('review/vote', body);
                    up = true;
                    down = false;
                    setReviewNumber(() => {
                        if(reviewNumber == 0){
                            return reviewNumber + 1 >= 0 ? reviewNumber + 1 : 0;
                        }
                        return reviewNumber + 2 >= 0 ? reviewNumber + 2 : 0;
                    })
                // If not voted yet
                } else {
                    await api.post('review/vote', body);
                    up = true;
                    setReviewNumber(reviewNumber + 1 >= 0 ? reviewNumber + 1 : 0);
                }
                break;
            // If downvote was clicked...
            default:
                // If already upvoted
                if (voteStatus['up']) {
                    await api.put('review/vote', body);
                    up = false;
                    down = true;
                    setReviewNumber(() => {
                        if(reviewNumber <= 1){
                            return reviewNumber - 1 >= 0 ? reviewNumber - 1 : 0;
                        }
                        return reviewNumber - 2 >= 0 ? reviewNumber - 2 : 0;
                    })
                // If already downvoted
                } else if (voteStatus['down']) {
                    await api.delete('review/vote', body);
                    down = false;
                    setReviewNumber(reviewNumber + 1 >= 0 && reviewNumber != 0 ? reviewNumber + 1 : 0);          
                // If not voted yet
                } else {
                    await api.post('review/vote', body);
                    down = true;
                    setReviewNumber(reviewNumber - 1 >= 0 ? reviewNumber - 1 : 0);
                }
                break;
        }

        setVoteStatus({'up': up, 'down': down});
        // console.log(response);
    }

    React.useEffect(() => {

        let up = false;
        let down = false;

        if (review.userVote === 1) {
            up = true;
        } else if (review.userVote === -1) {
            down = true;
        }

        setVoteStatus({'up': up, 'down': down});
    },[review.userVote])

    const handleReport = () => {
        if(reportReason === '') {
            setReportError(true);
        } else {
            const body = {reviewID: review.reviewid, reason: reportReason};
            api.post('review/reports', body);
            setOpen(false);
            setSucccess(true);
        }
    }

    const handleRemove = (reviewid) => {
        const body = {reviewId: reviewid};
        api.delete('review', body);
        const tempReviews = JSON.parse(JSON.stringify(reviews));
        const newReviews = tempReviews.filter(tempR => tempR.reviewid !== reviewid);
        setReviews(newReviews)
        console.log(isAdmin)
    }
    
    return (
        <Grid container item direction="column" className={classes.root} spacing={3} xs={9}>
            <Paper className={classes.reviewContainer}>
            <Grid container item direction="row" justify="space-between">
                <Grid container item direction="row" xs={2}>
                    <Grid item xs={6}>
                        <Avatar>{review.username ? review.username.slice(0,1) : ''}</Avatar>
                    </Grid>
                    <Grid container item direction="column" xs={6}>
                        <Grid item>
                            <Typography>{review.username}</Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={Number(review.rating)} readOnly />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Typography >{review.reviewdate}</Typography>
                </Grid>
            </Grid>
            <Grid container item justify="center" className={classes.reviewText}>
                <Grid item>
                    <Typography>"{review.reviewtext}"</Typography>
                </Grid>
            </Grid>
            <Grid container item direction="row" alignItems="center">
                <Grid item xs={4}>
                    <Typography >{reviewNumber} other people found this helpful</Typography>
                </Grid>
                <Grid container item direction="row" xs={8} alignItems="center" justify="flex-end">
                    <Grid item xs={6}>
                        <Typography >Found this review helpful? Give it a rating!</Typography>
                    </Grid>
                    <Grid container item direction="row" xs={3}>
                        <Grid item>
                            <IconButton onClick={() => {handleVotes('up');}}>
                                <ThumbUpIcon className={voteStatus.up ? classes.upVote : classes.noVote}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {handleVotes('down');}}>
                                <ThumbDownIcon className={voteStatus.down ? classes.downVote : classes.noVote}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {setOpen(true)}}>
                                <FlagIcon></FlagIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Grid container className={classes.reportModal}>
                        <Paper className={classes.reportModalContainer}>
                            <Typography variant="h6">Why would you like to report this review?</Typography>
                            <Grid item className={classes.reportModalContainer}>
                                <FormControl fullWidth>
                                    <FormLabel>Reason for Report</FormLabel>
                                    <Select
                                        // value = {reportReason}
                                        error={reportError}
                                        onChange={(event)=>{setReportReason(event.target.value)}}
                                        >
                                        <MenuItem value='harassment'>This review is harassing me or someone else</MenuItem>
                                        <MenuItem value='offensive'>This review is offensive</MenuItem>
                                        <MenuItem value='irrelevant'>This review is irrelevant to the product</MenuItem>
                                    </Select>
                                    <FormHelperText>{reportError ? 'Please provide a reason': ''}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid container item direction="row" justify="center">
                                <Grid item>
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {setOpen(false)}}>Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {handleReport()}}>Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                </Grid>
            </Modal>
            <Grid item>
                {userType === 'Admin'?
                    <Button
                        color="primary" 
                        variant="contained"
                        onClick={() => {handleRemove(review.reviewid)}}
                    >
                        Remove Review
                    </Button>
                : ''
                }
            </Grid>
            </Paper>

            {success &&
            <Snackbar open={success} autoHideDuration={1000} onClose={() => setSucccess(false)}>
                <Alert severity="success">This review has been reported</Alert>
            </Snackbar>
            }
        </Grid>
        
    )

}

export default ReviewCard;