import { Grid, Button, Modal, Typography, OutlinedInput, Paper, FormControl, FormHelperText, Snackbar } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import AccInfoblock from './AccInfoBlock';
import Alert from '@material-ui/lab/Alert';

const api = new API();

const ProfilePageAccountInfo = ({accInfo, shippingInfo}) => {
    
    const [editComponent, setEditComponent] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState(accInfo.password);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    
    const [oldPasswordError, setOldPasswordError] = React.useState('');
    const [newPasswordError, setNewPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
    
    const [success, setSuccess] = React.useState(false);
    
    const handleInput = (value, field) => {
        switch (field) {
            case 'new':
                setNewPassword(value);
                break;
            case 'confirm':
                setConfirmPassword(value);
                break;
            default:
                setOldPassword(value);
                break;
        }
        
    }
    
    const handleEditDetails = () => {
        setEditComponent(true);
    };

    const [open, setOpen] = React.useState(false);
    
    const handleToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    
    const handleSubmit = async () => {
        let error = false;
    
        if (oldPassword !== accInfo.password) {
            setOldPasswordError('Passwords do not match');
            error = true;
        } else if (!oldPassword) {
            setOldPasswordError('Please enter your old password')
        }
        
        if (!newPassword) {
            setNewPasswordError('New password cannot be empty');
            error = true;
        }
        
        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            error = true;
        }
        
        if (!error) {
            console.log(accInfo, shippingInfo);
            const body = {
                admin: false,
                city: shippingInfo.city,
                country: shippingInfo.country,
                email: accInfo.email,
                name: accInfo.name,
                password: newPassword,
                phone: accInfo.password,
                postcode: shippingInfo.postcode,
                streetAddres: shippingInfo.streetAddres
            }
            const response = await api.put(`profile/${localStorage.getItem('userId')}`, body, {'request-type': 'change password'});
            console.log(response);
            handleToggle();
            setSuccess(true);
        }
    }
    
    return (
        <Grid container item direction="column" className="information-tab">
            <AccInfoblock 
                editComponent={editComponent}
                accInfo={accInfo}
                shippingInfo={shippingInfo}
                setEditComponent={setEditComponent}
            />
            <Grid container item direciton="row">
                <Grid item>
                    <Button color="primary" variant="contained" onClick={handleToggle}>Change Password</Button>
                    <Modal open={open}>
                        <Grid container direction="column" >
                            <Paper className="modal">
                                <Grid item>
                                    <Typography variant="h5">Change your Password</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container item direction="row" justify="space-between">
                                        <Grid item>
                                            <Typography>Old password:</Typography>
                                        </Grid>
                                        <Grid item>
                                        <FormControl error={oldPasswordError === '' ? false: true}>
                                            <OutlinedInput 
                                            type="password" 
                                            placeholder="old password"
                                            onChange={(event) => handleInput(event.target.value, 'old')}
                                            />
                                            <FormHelperText>{oldPasswordError}</FormHelperText>
                                        </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row"  justify="space-between">
                                        <Grid item>
                                            <Typography>New password:</Typography>
                                        </Grid>
                                        <Grid item>
                                        <FormControl error={newPasswordError === '' ? false: true}>
                                            <OutlinedInput 
                                            type="password" 
                                            placeholder="New password"
                                            onChange={(event) => handleInput(event.target.value, 'new')}
                                            />
                                            <FormHelperText>{newPasswordError}</FormHelperText>
                                        </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row"  justify="space-between">
                                        <Grid item>
                                            <Typography>Confirm password:</Typography>
                                        </Grid>
                                        <Grid item>
                                        <FormControl error={confirmPasswordError === '' ? false: true}>
                                            <OutlinedInput 
                                            type="password" 
                                            placeholder="Confirm password"
                                            onChange={(event) => handleInput(event.target.value, 'confirm')}
                                            />
                                            <FormHelperText>{confirmPasswordError}</FormHelperText>
                                        </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row" justify="center" className="modal-button-container">
                                        <Grid item>
                                            <Button variant="contained" onClick={handleToggle}>Cancel</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Modal>
                </Grid> 
                {success && 
                <Snackbar open={success} autoHideDuration={1000}>
                    <Alert severity="success">You have successfuly changed your password!</Alert>
                </Snackbar>
                }
                <Grid item>
                    <Button color="primary" variant="contained" onClick={()=> handleEditDetails()}>Edit Details</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProfilePageAccountInfo;