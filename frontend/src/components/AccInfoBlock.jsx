import React from 'react';
import { Button, Grid, Input, Typography } from '@material-ui/core';
import API from '../util/API';

const api = new API();

const AccInfoblock = ({editComponent, name, email, phone}) => {
    
    const [editName, setEditName] = React.useState(name);
    const [editEmail, setEditEmail] = React.useState(email);
    const [editPhone, setEditPhone] = React.useState(phone);
    
    const handleChange = (value, flag) => {
        switch(flag) {
            case 'name':
                setEditName(value);
                break;
            case 'email':
                setEditEmail(value);
                break;
            default:  
                setEditPhone(value);
                break;
        }
    }
    
    const handleSubmit = async () => {
        const body = {name: editName, email: editEmail, phone: editPhone};
        const response = await api.put(`profile/${localStorage.getItem('userId')}`, body);
        console.log(response);
    }
    
    return (
        <div>
            {editComponent === true? 
                <Grid container item direction="column">
                    <Grid item>
                        <Typography variant="h3">Account information</Typography>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <Typography variant="body2">Name:</Typography>
                        </Grid>
                        <Grid item>
                            <Input 
                                value={editName} 
                                onChange={(event) => handleChange(event.target.value, 'name')} 
                                variant="body2">
                            </Input>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <Typography variant="body2">Email:</Typography>
                        </Grid>
                        <Grid item>
                            <Input 
                                value={editEmail} 
                                onChange={(event) => handleChange(event.target.value, 'email')} 
                                variant="body2"
                            ></Input>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <Typography variant="body2">Phone:</Typography>
                        </Grid>
                        <Grid item>
                            <Input 
                                value={editPhone} 
                                onChange={(event) => handleChange(event.target.value, 'phone')} 
                                variant="body2">
                            </Input>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => handleSubmit()}>Confirm Changes</Button>
                    </Grid>
                </Grid>
            :
            <Grid container item direction="column">
                    <Grid item>
                        <Typography variant="h3">Account information</Typography>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <Typography variant="body2">Name:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <Typography variant="body2">Email:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{email}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item>
                            <Typography variant="body2">Phone:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </div>
    );

}

export default AccInfoblock;