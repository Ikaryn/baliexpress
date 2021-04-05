import { Avatar, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import API from '../../util/API';

const api = new API()

const useStyles = makeStyles((theme) => ({
    root: {
        
    }
}))

const ReviewCard = ({review, userId}) => {
    
    const classes = useStyles();

    const [username, setUsername] = React.useState('');

    const [voteStatus, setVoteStatus] = React.useState({'up': false, 'down': false})

    // sdfas
    // <s><s></s
    
    
    // asdf
    
    // asdf
    
    // >
    // <datagrid><a href="aasdf
    // a"
    // aa>
    //     <a href="a"
    //     aa>
    //         <a href="a"></a></a></a></datagrid></s>
    //         <a href="a
    //         asdf
    //         asdf
    //         asdf
    //         asdf
    //         asdf
    //         asdf
    //         asdf
    //         asd
    //         fas
    //         dfa
    //         sdf
    //         asdf
    //         as
    //         f
    //         asdf
    //         asdf

    //         "
    //         aria-activedescendanta
    //         aria-activedescendanta
    //         a></a>
    
    const handleVotes = async (type) => {
        // DON'T FORGET TO HANDLE COLOUR CHANGE
        const value = type === 'down' ? -1 : 1;
        const body = {reviewId: review.reviewid, userId: userId, vote: value};

        let up = voteStatus.up;
        let down = voteStatus.down;
        
        console.log('type was ', type);
        switch (type) {

            // If upvote was clicked...
            case 'up':
            console.log('up was clicked');
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
            console.log('down was clicked');
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


    console.log("HELLO THERE");
    console.log("REVIEW RATING:", review.rating);

    // React.useEffect(() => {
    //     (async () => {
    //         const options = {
    //             method: 'GET',
    //             headers: { 
    //                 'Content-Type': 'application/json',
    //                 'Request-Type': 'profile',
    //             },
    //         }
            
    //         console.log("REVIEW:", review)
    //         console.log ("THIS IS THE REVIEWER USER ID", review.userid)

    //         if (review.id) {
    //             const response = await api.makeAPIRequest(`profile/${review.userid}?userId=${review.userid}`, options);
    //             console.log(response);
    //             const userDetails = response.accountInfo;
    //             setUsername(userDetails.name);
    //         }
    //     })();
    // },[])
    
    return (
        <Grid container item direction="column" className={classes.root}>
            <Grid container item direction="row">
                <Grid container direction="row">
                    <Grid item>
                        <Avatar>placeholder</Avatar>
                    </Grid>
                    <Grid container item direction="column">
                        <Grid item>
                            <Typography>{review.username}</Typography>
                        </Grid>
                        <Grid item>
                            <Rating defaultValue={review.rating} readOnly />
                        </Grid>
                    </Grid>
                </Grid>
                <Typography>{review.reviewdate}</Typography>
            </Grid>
            <Grid item>
                <Typography>{review.reviewtext}</Typography>
            </Grid>
            <Grid container item direction="row">
                <Grid item>
                    <Typography>{review.score} other people found this helpful</Typography>
                </Grid>
                <Grid container item direction="row">
                    <Grid item>
                        <Typography>Found this review helpful? Give it a rating!</Typography>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <IconButton onClick={() => {handleVotes('up');}}>
                                <ThumbUpIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {handleVotes('down');}}>
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