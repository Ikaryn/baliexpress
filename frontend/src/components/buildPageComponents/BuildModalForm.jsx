import { Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router';



const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 220,
        marginBottom: '1em',
    },
  }));
  
  
const BuildModalForm = ({handleToggle, setOpen}) => {
    const classes = useStyles();
    const [usage, setUsage] = React.useState('');
    const [budget, setBudget] = React.useState('');
    const [overclock, setOverClock] = React.useState(false);
    const [storage, setStorage] = React.useState('');
    const history = useHistory();

    const handleUsageChange = (value) => {
        setUsage(value);
    }
    
    const handleRedirect = (flag) => {
        handleToggle(false);
        if (flag === 'empty'){ 
            history.push('/build');
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
                <Divider />
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="useage-input">Usage</InputLabel>
                        <Select fullWidth value={usage} onChange={(event) => handleUsageChange(event.target.value)}>
                            <MenuItem value='business'>Business</MenuItem>
                            <MenuItem value='gaming'>Gaming</MenuItem>
                            <MenuItem value='video'>Video Editing/Rendering</MenuItem>
                            <MenuItem value='animation'>Animation</MenuItem>
                            <MenuItem value='art'>Art</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="budget-input">Budget</InputLabel>
                        <OutlinedInput value={budget} onChange={event => setBudget(event.target.value)}></OutlinedInput>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type of Storage</InputLabel>
                        <Select fullWidth value={storage} onChange={event => {setStorage(event.target.value)}}>
                            <MenuItem value="hdd">HDD</MenuItem>
                            <MenuItem value="ssd">SSD</MenuItem>
                        </Select>
                    </FormControl>
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
                        <Button color="primary" variant="contained">Take me to my new PC!</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    
    )
}

export default BuildModalForm;