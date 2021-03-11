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
    const [emailError, setEmailError] = React.useState('')
    const [pwdError, setPwdError] = React.useState('')

    const history = useHistory();

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError('');
        console.log("YEP")
        console.log("Email value: ", value)
    }


    async function fetchLogin(e) {
        e.preventDefault();
        console.log(email, password);
        if(email === '' || checkValidEmail(email)) {
            console.log("Email value: ", email)
            if(email !== '') console.log("email is considered not empty");
            if(checkValidEmail(email)) console.log("email is considered valid");
            setEmailError('Please enter a valid email address');
            // const ie = setErrorMsg('username', 'Email Is empty');
            // console.log(ie);
            // setInputError(ie);
            // console.log(inputError);
            
        }

        

        if (password === '') {
            setPwdError('Please enter a password');
            // const ie = setErrorMsg('password', 'Password Is empty');
            // console.log(ie);
            // setInputError(ie);
        }
        
        
        // if(username && password) {
        //     api.post('login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             username: username,
        //             password: password,
        //         }),
        //     })
        //     .then((res) =>{ 
        //         localStorage.setItem('token', res.token);
        //         // history.push('/');
        //     })
        // } else {
        //     if(!username) {
        //         console.log('hello');
        //         // let inputErrorDup = inputError;
        //         // inputErrorDup.username[0] = true;
        //         // inputErrorDup.username[1] = 'Email is empty';
        //         const ie = setErrorMsg('username', 'Email Is empty');
        //         console.log(ie);
        //         setInputError(ie);
        //     }
        // }
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
                        <OutlinedInput id="user-login-password" onChange={event => setPassword(event.target.value)} value={password}/>
                        <FormHelperText>{pwdError}</FormHelperText>
                    </FormControl>            
                </Grid>
                <Button fullWidth variant="contained" type="submit" onClick={(event) => {fetchLogin(event)}}>Submit</Button>
            </form>
            <p>Don't have an account? Create one here!</p>
            </Grid>
        </main>
        
    )

}

export default Login;