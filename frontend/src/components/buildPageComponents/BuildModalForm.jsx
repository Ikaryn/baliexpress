import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router';
import API from '../../util/API';



const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 220,
        marginBottom: '1em',
    },
    divider: {
        marginBottom: '1em',
    },
  }));
  
const api = new API();

const BuildModalForm = ({handleToggle, setOpen}) => {
    const classes = useStyles();
    const [usage, setUsage] = React.useState('');
    const [budget, setBudget] = React.useState('');
    const [overclock, setOverClock] = React.useState(false);
    const [storage, setStorage] = React.useState('');
    const [error, setError] = React.useState({
        'usage': '',
        'budget': '',
        'storage': ''
    });
    
    
    const history = useHistory();

    const handleUsageChange = (value) => {
        setUsage(value);
    }
    
    const errorHandler = () => {
        let isError = false;
        let errorObject = JSON.parse(JSON.stringify(error));
        if (usage === '') {
            errorObject['usage'] = 'Please select a usage.';
            isError = true;
        }
        if (budget === '') {
            errorObject['budget'] = "Please enter a budget";
            isError = true;
        }
        if (typeof budget !== 'number') {
            errorObject['budget'] = "Budget must be a number";
            isError = true;
        }
        if (storage === '') {
            error['storage'] = "Please specify which storage";
            isError = true;
        }
        
        setError(errorObject);
        
        return isError;
    }
    
    const handleRedirect = (flag) => {
        if (flag === 'empty'){ 
            handleToggle(false);
            history.push('/build');
        } else if (flag === 'build'){
            console.log(errorHandler());
            if (!errorHandler()) {
                history.push('/build');
                const res = api.get(`build?usage=${usage}&&budget=${budget}&&overclock=${overclock}&&storage=${storage}`)
                console.log(usage, budget, overclock, storage)
                console.log(res);
                handleToggle(false);
            }
        }
    }
    

    return (
        <Grid container spacing={3}>
            <Paper className="modal-container">
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h3">Build-A-PC</Typography>
                    </Grid>
                    <Button onClick={() => {setOpen(false)}}>X</Button>
                </Grid>
                <Divider />
                <Grid item>
                    <Typography variant="h6">Building a PC and don't know where to start? Fill out this short form and have a custom built pc specific to your needs!</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">PC Requirements</Typography>
                </Grid>
                
                <Divider className={classes.divider}/>
                <Grid item>
                    <Typography>Not all PC's are built to the same specs! Please let us know what you would use it for, so we can curate a PC custom built for you.</Typography>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="useage-input">Usage</InputLabel>
                        <Select error={error['usage'] === '' ? false : true} fullWidth value={usage} onChange={(event) => handleUsageChange(event.target.value)}>
                            <MenuItem value='business'>Business</MenuItem>
                            <MenuItem value='gaming'>Gaming</MenuItem>
                            <MenuItem value='video'>Video Editing/Rendering</MenuItem>
                            <MenuItem value='animation'>Animation</MenuItem>
                            <MenuItem value='art'>Art</MenuItem>
                        </Select>
                        <FormHelperText>{error['usage']}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography>Let us know how much you have to spend! This will allow us to create the most bang for your buck build.</Typography>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="budget-input">Budget</InputLabel>
                        <OutlinedInput error={error['budget'] === '' ? false : true} value={budget} onChange={event => setBudget(event.target.value)}></OutlinedInput>
                        <FormHelperText>{error['budget']}</FormHelperText>
                    </FormControl>
                </Grid>
                <Typography>Don't know what these options mean? Don't worry We'll tell you! HDD Stands for hard drives, these are more older, but the more affordable option. SSD is the newer technology allowing faster load times and more power efficiency, but at a higher cost.</Typography>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type of Storage</InputLabel>
                        <Select error={error['storage'] === '' ? false : true} fullWidth value={storage} onChange={event => {setStorage(event.target.value)}}>
                            <MenuItem value="hdd">HDD</MenuItem>
                            <MenuItem value="ssd">SSD</MenuItem>
                        </Select>
                        <FormHelperText>{error['storage']}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography>Want to push your parts to the limit? Overclocking increases performance but reduces the lifespan of your components.</Typography>
                </Grid>
                <Grid item>
                    <FormControlLabel 
                        control={
                            <Checkbox checked={overclock} onChange={() => {overclock ? setOverClock(false) : setOverClock(true)}} color="primary" />
                        }
                        label="Overclock"
                    />
                </Grid>
                <Grid container item direction="row">
                    <Grid item xs={6}>
                        <Button color="primary" variant="contained" onClick={() => {handleRedirect('empty')}}>I just want to use your Template!</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color="primary" variant="contained" onClick = {() => {handleRedirect('build')}}>Take me to my new PC!</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    
    )
}

export default BuildModalForm;