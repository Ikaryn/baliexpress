import React from 'react';
import { useHistory } from 'react-router';
import API from '../util/API';
import { Button, Grid, Typography, FormHelperText , OutlinedInput, FormControl, InputLabel, Modal, Paper, makeStyles } from '@material-ui/core';
import { StoreContext } from '../util/store';

const api = new API();

function checkValidEmail (input) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
}

const useStyles = makeStyles(() => ({
    forgotPasswordModal: {
        marginTop: '50%',
        marginLeft: '50%',
    },
}))

const Login = () => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [pwdError, setPwdError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const [open, setOpen] = React.useState(false)
    
    const context = React.useContext(StoreContext);
    const { userType: [, setUserType] } = context;

    const history = useHistory();
    const classes = useStyles();

    //handle login
    async function fetchLogin(e) {
        e.preventDefault();
        console.log(email, password);
        setEmailError('');
        setPwdError('');

        let error = false;
        
        if (email === '' || !checkValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            error = true;
        }

        if (password === '') {
            setPwdError('Please enter a password');
            error = true;
        }

        if (error) return;

        const response = await api.post('login', {email : email, password: password});

        console.log(response);
        if(response.token){
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            // localStorage.setItem('isAdmin', response.)
            response.admin === true ? setUserType('Admin') : setUserType('User');
            history.push('');
        } else {
            setLoginError(response.error);
        }

    }
    
    const handleRegisterClick = () => {
        history.push('/register');
    }
    
    const handleForgotPassword = () => {

    }

    return (
        <main className="root">
            <Grid
                className="Login-Form-Container"
                container
                direction="column"
                alignContent="center"
                spacing={4}
            >
            <Grid item>
                <Typography className="light-text" variant="h1">Login</Typography>
            </Grid>
            <form>
                <Grid item>
                    <FormControl error={emailError === '' ? false : true} fullWidth>
                        <InputLabel>Email Address</InputLabel>
                        <OutlinedInput id="user-login-email" onChange={event => setEmail(event.target.value)} value={email}/>
                        <FormHelperText>{emailError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl error={pwdError === '' ? false : true} fullWidth>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput type="password" id="user-login-password" onChange={event => setPassword(event.target.value)} value={password}/>
                        <FormHelperText>{pwdError}</FormHelperText>
                    </FormControl>            
                </Grid>
                
                <Button color="primary" fullWidth variant="contained" type="submit" onClick={(event) => {fetchLogin(event)}}>Submit</Button>
            </form>
            <Button onClick={() => handleRegisterClick()}>Don't have an account? Create one here!</Button>
            <Button onClick={() => setOpen(true)}>Forgot your password?</Button>
            
            <Typography variant="body1" color="secondary">{loginError}</Typography>
            </Grid>
            {/* <Grid item>    
                <Modal open={open} onClose={() => {setOpen(false)}}>
                    <Grid container classname={classes.forgotPasswordModal}>
                        <Paper>
                            <Typography classname="light-text">Enter your account email</Typography>
                            <Grid item>
                                <FormControl error={emailError === '' ? false : true} fullWidth>
                                    <InputLabel>Email Address</InputLabel>
                                    <OutlinedInput id="user-login-email" onChange={event => setEmail(event.target.value)} value={email}/>
                                    <FormHelperText>{emailError}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <Button color="primary" variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                                </Grid>
                                <Grid item>
                                    <Button color="primary" variant="contained" onClick={() => handleForgotPassword()}>Submit</Button>
                                </Grid> 
                            </Grid>
                        </Paper>
                    </Grid>
                </Modal>
            </Grid> */}
        </main>
        
        
    )

}

export default Login;