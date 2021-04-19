import React from 'react';
import { useHistory } from 'react-router';
import API from '../util/API';
import { Button, Grid, Typography, FormHelperText , OutlinedInput, FormControl, InputLabel } from '@material-ui/core';
import { StoreContext } from '../util/store';

const api = new API();

function checkValidEmail (input) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
}

const Login = () => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [pwdError, setPwdError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    
    const context = React.useContext(StoreContext);
    const { userType: [, setUserType] } = context;

    const history = useHistory();

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
                    <FormControl error={emailError === '' ? false : true}>
                        <InputLabel>Email Address</InputLabel>
                        <OutlinedInput id="user-login-email" onChange={event => setEmail(event.target.value)} value={email}/>
                        <FormHelperText>{emailError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl error={pwdError === '' ? false : true}>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput type="password" id="user-login-password" onChange={event => setPassword(event.target.value)} value={password}/>
                        <FormHelperText>{pwdError}</FormHelperText>
                    </FormControl>            
                </Grid>
                <Button color="primary" fullWidth variant="contained" type="submit" onClick={(event) => {fetchLogin(event)}}>Submit</Button>
            </form>
            <Button onClick={() => handleRegisterClick()}>Don't have an account? Create one here!</Button>
            <Typography variant="body1" color="secondary">{loginError}</Typography>
            </Grid>
        </main>
        
    )

}

export default Login;