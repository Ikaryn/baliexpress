import { Button, FormControl, Grid, Input, FormHelperText, Snackbar, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react'
import API from '../../util/API';

const api = new API();

const ShippingBlock = ({user}) => {

    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [postcode, setPostcode] = React.useState('');
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('');

    const [addressError, setAddressError] = React.useState('');
    const [cityError, setCityError] = React.useState('');
    const [postcodeError, setPostcodeError] = React.useState('');
    const [stateError, setStateError] = React.useState('');
    const [countryError, setCountryError] = React.useState('');

    const [changedInfo, setChangedInfo] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const attributes = {
                        'address': {field: address, setField: setAddress, setError: setAddressError},
                        'city': {field: city, setField: setCity, setError: setCityError},
                        'postcode': {field: postcode, setField: setPostcode, setError: setPostcodeError},
                        'state': {field: state, setField: setState, setError: setStateError},
                        'country': {field: country, setField: setCountry, setError: setCountryError}
                        }

    React.useEffect(()=>{

        console.log(user);
        setAddress(user.streetaddress);
        setCity(user.city);
        setPostcode(user.postcode);
        setCountry(user.country);
        setState(user.state);
        
    },[user])

    const handleChange = (key, value) => {

        attributes[key].setField(value);
    }

    // If the current values are the same as the user's details, disable the update button
    React.useEffect(() => {

        // console.log("Fields:");
        // console.log("Comparing", address, "to", user.streetaddress);
        // console.log("Comparing", city, "to", user.city);
        // console.log("Comparing", postcode, "to", user.postcode);
        // console.log("Comparing", state, "to", user.state);
        // console.log("Comparing", country, "to", user.country);

        if (address === user.streetaddress &&
                city === user.city &&
                postcode === user.postcode &&
                state === user.state &&
                country === user.country) {
            setChangedInfo(false);
        } else {
            setChangedInfo(true);
        }

    })

    function checkInputNumber (input) {
        return /^[1-9]\d*$/.test(input);
    }

    function checkInputAlpha (input) {
        return /^[a-zA-Z ]+$/.test(input);
    }

    const handleSubmit = async () => {

        let error = false;

        Object.keys(attributes).forEach(attribute => attributes[attribute].setError(''))
        
        for (let attribute in attributes) {

            if (attributes[attribute].field === '') {
                attributes[attribute].setError(attribute + ' cannot be empty');
                error = true;
            } else if (attribute === 'city' || attribute === 'state' || attribute === 'country') {
                if (!checkInputAlpha(attributes[attribute].field)) {
                    attributes[attribute].setError('Invalid ' + attribute);
                    error = true;
                }
            } else if (attribute === 'postcode') {
                if (!checkInputNumber(postcode)) {
                    setPostcodeError('Invalid postcode');
                    error = true;
                }
            }

        }

        if (error) return;

        const body = {
            streetaddress: address,
            city: city,
            postcode: postcode,
            state: state,
            country: country
        }

        const response = await api.put(`profile?userId=${localStorage.getItem('userId')}`, body);
        console.log(response);
        setChangedInfo(false);
        setSuccess(true);
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography>Address</Typography>
                <FormControl error={addressError === '' ? false : true}>
                    <Input value={address} onChange={(event) => {handleChange('address', event.target.value)}} />
                    <FormHelperText>{addressError}</FormHelperText>
                </FormControl> 
            </Grid>
            <Grid item container direction="row">
                <Grid item>
                    <Typography>City</Typography>
                    <FormControl error={cityError === '' ? false : true}>
                        <Input value={city} onChange={(event) => {handleChange('city', event.target.value)}} />
                        <FormHelperText>{cityError}</FormHelperText>
                    </FormControl> 
                </Grid>
                <Grid item>
                    <Typography>Postcode</Typography>
                    <FormControl error={postcodeError === '' ? false : true}>
                        <Input value={postcode} onChange={(event) => {handleChange('postcode', event.target.value)}} />
                        <FormHelperText>{postcodeError}</FormHelperText>
                    </FormControl> 
                </Grid>
            </Grid>
            <Grid item container direction="row">
                <Grid item>
                    <Typography>State</Typography>
                    <FormControl error={stateError === '' ? false : true}>
                        <Input value={state} onChange={(event) => {handleChange('state', event.target.value)}} />
                        <FormHelperText>{stateError}</FormHelperText>
                    </FormControl> 
                </Grid>
                <Grid item>
                    <Typography>Country</Typography>
                    <FormControl error={countryError === '' ? false : true}>
                        <Input value={country} onChange={(event) => {handleChange('country', event.target.value)}} />
                        <FormHelperText>{countryError}</FormHelperText>
                    </FormControl> 
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    color="primary" 
                    variant="contained"
                    disabled={!changedInfo}
                    onClick={() => handleSubmit()}
                >
                    Update Shipping Info
                </Button>
            </Grid>
            {success && 
                <Snackbar open={success} autoHideDuration={1000}>
                    <Alert severity="success">Shipping Information Updated</Alert>
                </Snackbar>
            }
        </Grid>
    )
}

export default ShippingBlock;