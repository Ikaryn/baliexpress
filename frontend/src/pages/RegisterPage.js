import React from 'react';
import { useHistory } from 'react-router';
import API from '../util/API';
import {FormControl, InputLabel, Input, FormHelperText, Grid, OutlinedInput, Typography, Button} from '@material-ui/core'; 

const api = new API();

function checkValidEmail (input) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
}
const Register = () => {
    
    const history = useHistory();
    
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const [nameError, setNameError] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [pwdError, setPwdError] = React.useState('')
    const [phoneError, setPhoneError] = React.useState('')


    function checkValidPhone (input) {
        return /^[1-9]\d*$/.test(input);
    }
    
    const handleLoginClick = () => {
        history.push('login');
    }
    
    async function fetchRegister(e) {
        e.preventDefault();
        console.log(name, email, password, phone);

        if (name === '') {
            setNameError('Please enter your name');
            return;   
        }

        if (email === '' || !checkValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (password === '') {
            setPwdError('Please enter a password');
            return;
        }

        if (phone === '' || !checkValidPhone(phone)) {
            setPhoneError('Please enter a valid phone number');
            return;
        }
        
        api.post('register', {
                name: name,
                email: email,
                password: password,
                phone: phone,      
        })
        .then((res) =>{
            console.log(res);
            // history.push('/')
        });
    }

    return (
        <div>
            <Grid 
                className="Register-Form-Container"
                container
                direction="column"
                alignContent="center"
                alignItems="center"
                spacing={4}
            >
                <Typography variant="h1">Register</Typography>
                <form>  
                <Grid item>
                    <FormControl error={nameError === '' ? false : true}>
                        <InputLabel>Name</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            id="name" 
                            onChange={event => setName(event.target.value)} />
                        <FormHelperText>{nameError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                <FormControl error={emailError === '' ? false : true}>
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            id="email"
                            onChange={event => setEmail(event.target.value)} />
                        <FormHelperText>{emailError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                <FormControl error={pwdError === '' ? false : true}>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            id="password" 
                            onChange={event => setPassword(event.target.value)} />
                        <FormHelperText>{pwdError}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                <FormControl error={phoneError === '' ? false : true}>
                        <InputLabel>Phone</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="phone"
                            onChange={event => setPhone(event.target.value)} />
                        <FormHelperText>{phoneError}</FormHelperText>
                    </FormControl>     
                </Grid>

                <Button type="submit" onClick={(event) => {fetchRegister(event)}}>Register</Button>
                <Button onClick={() => handleLoginClick()}>I already have an account!</Button>
                </form>
            </Grid>
        </div>
    )
    
}


export default Register;