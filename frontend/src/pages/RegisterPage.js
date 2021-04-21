import React from 'react';
import { useHistory } from 'react-router';
import API from '../util/API';
import {FormControl, InputLabel, FormHelperText, Grid, OutlinedInput, Typography, Button} from '@material-ui/core'; 
import { StoreContext } from '../util/store';

const api = new API();

function checkValidEmail (input) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
}

const Register = () => {
    
    const history = useHistory();
    const context = React.useContext(StoreContext);
    const { userType: [userType] } = context;
    
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const [nameError, setNameError] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [pwdError, setPwdError] = React.useState('')
    const [phoneError, setPhoneError] = React.useState('')

    const [RegisterMessage, setRegisterMessage] = React.useState('');
    
    if(userType.toLowerCase() !== 'guest') {
        history.push('/');
    }

    function checkValidPhone (input) {
        return /^[0-9]\d*$/.test(input);
    }
    
    const handleLoginClick = () => {
        history.push('/login');
    }
    
    async function fetchRegister(e) {
        e.preventDefault();
        console.log(name, email, password, phone);
        setNameError('');
        setEmailError('');
        setPwdError('');
        setPhoneError('');

        setRegisterMessage('');

        let error = false;

        if (name === '') {
            setNameError('Please enter your name');
            error = true;
        }

        if (email === '' || !checkValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            error = true;
        }

        if (password === '') {
            setPwdError('Please enter a password');
            error = true;
        }

        if (phone === '' || !checkValidPhone(phone)) {
            setPhoneError('Please enter a valid phone number');
            error = true;
        }

        // if (error) return;
        if (!error){
            api.post('register', {
                name: name,
                email: email,
                password: password,
                phonenumber: phone,  
            })
            .then((res) =>{
                console.log(res);
                // history.push('/')
                if (res.token) {
                    setRegisterMessage('Account successfully made! Redirecting you to the login page...')
                    setTimeout(() => {
                        history.push('/login');
                    }, 2000);
                } else {
                    setRegisterMessage(res.error);
                }
            });
        }

    }

    return (
        <div className="root">
            <Grid 
                className="Register-Form-Container"
                container
                direction="column"
                alignContent="center"
                alignItems="center"
                spacing={4}
            >
                <Typography className="light-text" variant="h1">Register</Typography>
                <form>  
                <Grid item>
                    <FormControl error={nameError === '' ? false : true} fullWidth>
                        <InputLabel>Name</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            id="name" 
                            onChange={event => setName(event.target.value)} />
                        <FormHelperText>{nameError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                <FormControl error={emailError === '' ? false : true} fullWidth>
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            id="email"
                            onChange={event => setEmail(event.target.value)} />
                        <FormHelperText>{emailError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                <FormControl error={pwdError === '' ? false : true} fullWidth>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            type="password"
                            id="password" 
                            onChange={event => setPassword(event.target.value)} />
                        <FormHelperText>{pwdError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                <FormControl error={phoneError === '' ? false : true} fullWidth>
                        <InputLabel>Phone</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="phone"
                            onChange={event => setPhone(event.target.value)} />
                        <FormHelperText>{phoneError}</FormHelperText>
                    </FormControl>     
                </Grid>

                <Button variant="contained" color="primary" type="submit" onClick={(event) => {fetchRegister(event)}}>Register</Button>
                <Button variant="contained" color="primary" onClick={() => handleLoginClick()}>I already have an account!</Button>
                </form>
                <Typography variant="body1" color="secondary">{RegisterMessage}</Typography>
            </Grid>
        </div>
    )
    
}


export default Register;