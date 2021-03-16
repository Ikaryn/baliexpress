import React from 'react';
import { Button, Divider, Grid, Input, Typography, FormControl, FormHelperText } from '@material-ui/core';
import API from '../util/API';
import './styles/profilePage.css';

const api = new API();

const AccInfoblock = ({editComponent, accInfo, shippingInfo, setEditComponent}) => {
    
    const [userInfo, setUserInfo] = React.useState(accInfo);
    
    const [editName, setEditName] = React.useState('');
    const [editEmail, setEditEmail] = React.useState('');
    const [editPhone, setEditPhone] = React.useState('');
    const [editAddr, setEditAddr] = React.useState('');
    const [editCity, setEditCity] = React.useState('');
    const [editPCode, setEditPCode] = React.useState('');
    const [editCountry, setEditCountry] = React.useState('');
    const [editState, setEditState] = React.useState('');

    const [nameError, setNameError] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [pwdError, setPwdError] = React.useState('')
    const [phoneError, setPhoneError] = React.useState('')
    const [cityError, setCityError] = React.useState('')
    const [pCodeError, setPCodeError] = React.useState('')
    const [countryError, setCountryError] = React.useState('')
    const [stateError, setStateError] = React.useState('')
    
    console.log(shippingInfo);
    React.useEffect(()=>{
        setUserInfo(accInfo);
        setEditName(accInfo.name);
        setEditEmail(accInfo.email);
        setEditPhone(accInfo.phone);
        setEditAddr(shippingInfo.addr);
        setEditCity(shippingInfo.city);
        setEditPCode(shippingInfo.pCode);
        setEditCountry(shippingInfo.country);
        setEditState(shippingInfo.state);
        
    },[accInfo, shippingInfo.addr, shippingInfo.city, shippingInfo.country, shippingInfo.pCode, shippingInfo.state])

    function checkValidEmail (input) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
    }

    function checkInputNumber (input) {
        return /^[1-9]\d*$/.test(input);
    }

    function checkInputAlpha (input) {
        return /^[a-zA-Z ]+$/.test(input);
    }
    
    const handleChange = (value, key) => {
        switch(key) {
            case 'name':
                return setEditName(value);
            case 'email':
                return setEditEmail(value);
            case 'phone':  
                return setEditPhone(value);
            case 'addr':
                return setEditAddr(value);
            case 'city':
                return setEditCity(value);
            case 'pCode':
                return setEditPCode(value);
            case 'country':
                return setEditCountry(value);
            default:
                return setEditState(value);
        }
    }
    
    const convertFieldName = (value) => {
        switch(value) {
            case 'name':
                return 'Name';
            case 'email':
                return 'Email';
            case 'phone':
                return 'Phone Number';
            case 'addr':
                return 'Address';
            case 'city':
                return 'City';
            case 'pCode':
                return 'Postal Code';
            case 'country':
                return 'Country';
            default:
                return 'State';
        }
    }
    
    const getInformationValues = (type) => {
        switch(type) {
            case 'name':
                return editName;
            case 'email':
                return editEmail;
            case 'phone':
                return editPhone;
            case 'addr':
                return editAddr;
            case 'city':
                return editCity;
            case 'pCode':
                return editPCode;
            case 'country':
                return editCountry;
            default:
                return editState;
        }
    }

    const getErrorValues = (type) => {
        switch(type) {
            case 'name':
                return nameError;
            case 'email':
                return emailError;
            case 'phone':
                return phoneError;
            case 'city':
                return cityError;
            case 'pCode':
                return pCodeError;
            case 'country':
                return countryError;
            case 'state':
                return stateError;
            default:
                return null;
        }
    }



    const handleSubmit = async () => {

        setNameError('');
        setEmailError('');
        setPhoneError('');
        setCityError('');
        setPCodeError('');
        setCountryError('');
        setStateError('');

        let error = false;

        if (editName === '') {
            setNameError('Name cannot be empty');
            error = true;
        }

        if (editEmail === '' || !checkValidEmail(editEmail)) {
            setEmailError('Invalid email address');
            error = true;
        }

        if (editPhone === '' || !checkInputNumber(editPhone)) {
            setPhoneError('Invalid phone number');
            error = true;
        }

        if (editCity !== '' && !checkInputAlpha(editCity)) {
            setCityError('Invalid city name');
            error = true;
        }

        if (!(editPCode == null || editPCode === '' || checkInputNumber(editPCode))) {
            console.log("editCode", editPCode);
            setPCodeError('Invalid post code');
            error = true;
        }

        if (editCountry !== '' && !checkInputAlpha(editCountry)) {
            setCountryError('Invalid country name');
            error = true;
        }

        if (editState !== '' && !checkInputAlpha(editState)) {
            setStateError('Invalid state name');
            error = true;
        }



        if (error) return;

        const body = {name: editName, email: editEmail, phone: editPhone};
        const response = await api.put(`profile/${localStorage.getItem('userId')}`, body);
        console.log(response);
        setEditComponent(false);
    }
    console.log(Object.keys(accInfo));
    return (
            <Grid container item direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h3">Account information</Typography>
                </Grid>
                <Divider/>
                {Object.keys(accInfo).map((value) => (
                    <Grid container item direction="row" spacing={10} justify="space-between">
                        <Grid item  className="account-info-field">
                            <Typography variant="h5">{convertFieldName(value) + ':'}</Typography>
                        </Grid>
                        <Grid item className="account-info-field">
                            {editComponent === true ?
                                <Grid item>
                                    <FormControl error={getErrorValues(value) === '' ? false : true}>
                                        <Input value={getInformationValues(value)} onChange={(event) => {handleChange(event.target.value, value)}} />
                                        <FormHelperText>{getErrorValues(value)}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            :
                            <Grid item>
                                <Typography variant="h5">{getInformationValues(value)}</Typography>
                            </Grid>
                            }
                        </Grid>
                    </Grid>
                ))}
                <Grid item>
                    <Typography variant="h3">Shipping information</Typography>
                </Grid>
                <Divider/>
                {Object.keys(shippingInfo).map((value) => (
                    <Grid container item direction="row" spacing={10} justify="space-between">
                        <Grid item className="account-info-field">
                            <Typography variant="h5">{convertFieldName(value) + ':'}</Typography>
                        </Grid>
                        <Grid item className="account-info-field">
                            {editComponent === true ?
                                <Grid item>
                                    <FormControl error={getErrorValues(value) === '' ? false : true}>
                                        <Input value={getInformationValues(value)} onChange={(event) => {handleChange(event.target.value, value)}} />
                                        <FormHelperText>{getErrorValues(value)}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            :
                                <Grid item>
                                    <Typography variant="h5">{getInformationValues(value)}</Typography>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                ))}
                {editComponent ? <Grid item>
                    <Button variant="contained" onClick={() => handleSubmit()}>Confirm Changes</Button>
                </Grid> : ''}
            </Grid>
    );

}

export default AccInfoblock;