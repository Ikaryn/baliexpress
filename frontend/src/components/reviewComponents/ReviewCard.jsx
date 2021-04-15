import { Avatar, Button, Grid, IconButton, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { useHistory } from 'react-router';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FlagIcon from '@material-ui/icons/Flag'
import API from '../../util/API';

const api = new API()

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    noVote: {
        fill: 'white'
    },
    upVote: {
        fill: 'rgb(106, 255, 87)'
    },
    downVote: {
        fill: 'rgb(117, 152, 255)'
    }
}))

const ReviewCard = ({review, userId}) => {
    
    const classes = useStyles();

    const [voteStatus, setVoteStatus] = React.useState({'up': false, 'down': false})
    const history = useHistory();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [reportReason, setReportReason] = React.useState();
    const reasons = [
        {
            value: 'harassment',
            label: 'This review is harassing me or someone else',
        },
        {
            value: 'offensive',
            label: 'This review is offensive',
        },
        {
            value: 'irrelevant',
            label: 'This review is irrelevant to the product',
        }
    ]

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
                    const response = await api.delete('review/vote', body);
                    up = false;
                // If already downvoted
                } else if (voteStatus['down']) {
                    const response = await api.put('review/vote', body);
                    up = true;
                    down = false;     
                // If not voted yet
                } else {
                    const response = await api.post('review/vote', body);
                    up = true;
                }
                break;
            // If downvote was clicked...
            default:
                // If already upvoted
                if (voteStatus['up']) {
                    const response = await api.put('review/vote', body);
                    up = false;
                    down = true;
                // If already downvoted
                } else if (voteStatus['down']) {
                    const response = await api.delete('review/vote', body);
                    down = false;            
                // If not voted yet
                } else {
                    const response = await api.post('review/vote', body);
                    down = true;
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
        setOpen(true)
    }
    
    return (
        <Grid container item direction="column" className={classes.root} spacing={3} xs={9}>
            <Grid container item direction="row" justify="space-between">
                <Grid container item direction="row" xs={2}>
                    <Grid item xs={6}>
                        <Avatar>{review.username ? review.username.slice(0,1) : ''}</Avatar>
                    </Grid>
                    <Grid container item direction="column" xs={6}>
                        <Grid item>
                            <Typography className={'light-text'}>{review.username}</Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={Number(review.rating)} readOnly />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={'light-text'}>{review.reviewdate}</Typography>
                </Grid>
            </Grid>
            <Grid container item justify="center">
                <Grid item>
                    <Typography className={'light-text'}>"{review.reviewtext}"</Typography>
                </Grid>
            </Grid>
            <Grid container item direction="row" alignItems="center">
                <Grid item xs={4}>
                    <Typography className={'light-text'}>{review.score} other people found this helpful</Typography>
                </Grid>
                <Grid container item direction="row" xs={8} alignItems="center" justify="flex-end">
                    <Grid item xs={6}>
                        <Typography className={'light-text'}>Found this review helpful? Give it a rating!</Typography>
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
                            <IconButton onClick={() => {handleReport()}}>
                                <FlagIcon></FlagIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Grid className="logout-confirmation-container">
                    <Typography>Why would you like to report this review?</Typography>
                    <Grid item>
                        <TextField
                            helperText = "Please select a reason"
                            select
                        ></TextField>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
        
    )

}

export default ReviewCard;