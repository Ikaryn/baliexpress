import React from 'react';
import { useHistory } from 'react-router';
import API from '../util/API';
import { Button, Grid, Typography, FormHelperText , OutlinedInput, FormControl, InputLabel, Input } from '@material-ui/core';
// import checkValidEmail from 'RegisterPage';

const api = new API();

function checkValidEmail (input) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
}
const Login = () => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [inputError, setInputError] = React.useState({'username': [false, ''], 'password': [false, '']});
    const [emailError, setEmailError] = React.useState('');
    const [pwdError, setPwdError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');

    const history = useHistory();

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError('');
    }


    async function fetchLogin(e) {
        e.preventDefault();
        console.log(email, password);
        if(email === '' || checkValidEmail(email)) {
            console.log("Email value: ", email)
            if(email !== '') console.log("email is considered not empty");
            if(checkValidEmail(email)) console.log("email is considered valid");
            setEmailError('Please enter a valid email address');

            
        }
        if (password === '') {
            setPwdError('Please enter a password');
        }
        
        const response = await api.post('login', {email : email, password: password});
        console.log(response);
        if(response.token){
            localStorage.setItem('token', response.token);
            history.push('')
        } else {
            setLoginError(response.error);
        }

    }
    
    const handleRegisterClick = () => {
        history.push('register');
    }
    
    // const setErrorMsg = (field, message) => {
    //     let inputErrorDup = inputError;
    //     inputErrorDup[field][0] = true;
    //     inputErrorDup[field][1] = message;
    //     setInputError(inputErrorDup);
    // }
    

    return (
        <main>
            <Grid
                className="Login-Form-Container"
                container
                direction="column"
                alignContent="center"
                spacing={4}
            >
            <Grid item>
                <Typography variant="h1">Login</Typography>
            </Grid>
            <form>
                <Grid item>
                    <FormControl error={emailError === '' ? false : true}>
                        <InputLabel>Email Address</InputLabel>
                        <OutlinedInput id="user-login-email" onChange={event => handleEmailChange(event.target.value)} value={email}/>
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
                <Button fullWidth variant="contained" type="submit" onClick={(event) => {fetchLogin(event)}}>Submit</Button>
            </form>
            <Button onClick={() => handleRegisterClick()}>Don't have an account? Create one here!</Button>
            <Typography variant="body1" color="secondary">{loginError}</Typography>
            </Grid>
        </main>
        
    )

}

export default Login;