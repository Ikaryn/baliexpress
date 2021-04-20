import { Button, Divider, FormControl, FormHelperText, Grid, 
        makeStyles, OutlinedInput, Paper, TextField, Typography 
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import API from '../../util/API';

const api = new API();

const useStyles = makeStyles(() => ({
    input: {
        width: '100%',
    },
    container: {
        margin: '15% 25%',
        padding: '1em',
        minWidth: '30%',
    }
}))

const SaveBuildModal = ({build, setSuccess, setOpen, edit}) => {
    
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [error, setError] = React.useState({
        'name': '',
    })
    
    React.useEffect(() => {
        if(build.name) {
            setName(build.name);
        }
        if(build.desc) {
            setDesc(build.desc);
        }    
    
    },[build.desc, build.name]);
    
    const classes = useStyles();
    
    const errorHandler = () => {
        let isError = false;
        const errorObject = JSON.parse(JSON.stringify(error));
        if (name === '') {
            errorObject['name'] = 'Please give your build a name';
            isError = true;
        }
        return isError;
    }
    
    const handleSubmit = () => {
        const buildData = {
            userID: localStorage.getItem('userId'),
            buildName: name,
            buildDesc: desc,
            build: build,
        };
        console.log(buildData);
        if(!errorHandler()){
            console.log(edit);
            if (edit === 0) {
                console.log('yo')
                api.post('build', buildData);
                setOpen(false);
                setSuccess(true);
            } else {   
                console.log('ok')
                api.put(`build`, buildData);
                setOpen(false);
                setSuccess(true);
            }
        }
    }
    
    return (
        <Paper className={classes.container}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h2">Save Build</Typography>
                </Grid>
                <Divider />
                <Grid item>
                    <Typography>Give your build a name!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <OutlinedInput 
                            error={error['name'] === '' ? false : true}
                            placeholder="Build Name" 
                            value={name} 
                            onChange={(event) => {setName(event.target.value)}}
                            />
                        <FormHelperText>{error['name']}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography>Give your build a description!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField 
                            variant="outlined"
                            multiline
                            rows={2}
                            placeholder="Build Description"
                            value={desc}
                            onChange={(event) => {setDesc(event.target.value)}}
                            />
                    </FormControl>
                </Grid>
                <Grid container item direction="row" spacing={1}>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={() => {setOpen(false)}} variant="contained" color="secondary">Cancel</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={() => {handleSubmit()}} variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SaveBuildModal