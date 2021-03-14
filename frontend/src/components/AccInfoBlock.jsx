import React from 'react';
import { Button, Divider, Grid, Input, Typography } from '@material-ui/core';
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
    
    const handleChange = (value, key) => {
        switch(key) {
            case 'name':
                setEditName(value);
                break;
            case 'email':
                setEditEmail(value);
                break;
            case 'phone':  
                setEditPhone(value);
                break;
            case 'addr':
                return setEditAddr(value);;
            case 'city':
                return setEditCity(value);;
            case 'pCode':
                return setEditPCode(value);;
            case 'country':
                return setEditCountry(value);;
            default:
                return setEditState(value);;
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
    const handleSubmit = async () => {
        const body = {name: editName, email: editEmail, phone: editPhone};
        const response = await api.put(`profile/${localStorage.getItem('userId')}`, body);
        console.log(response);
        setEditComponent(false);
    }
    console.log(Object.keys(accInfo));
    return (
            <Grid container item direction="column">
                <Grid item>
                    <Typography variant="h3">Account information</Typography>
                </Grid>
                <Divider/>
                {Object.keys(accInfo).map((value) => (
                    <Grid container item direction="row">
                        <Grid item  className="account-info-field">
                            <Typography variant="h5">{convertFieldName(value) + ':'}</Typography>
                        </Grid>
                        <Grid item className="account-info-field">
                            {editComponent === true ?
                                <Input value={getInformationValues(value)} onChange={(event) => {handleChange(event.target.value, value)}} />
                            :
                                <Typography variant="h5">{getInformationValues(value)}</Typography>
                            }
                        </Grid>
                    </Grid>
                ))}
                <Grid item>
                    <Typography variant="h3">Shipping information</Typography>
                </Grid>
                <Divider/>
                {Object.keys(shippingInfo).map((value) => (
                    <Grid container item direction="row">
                        <Grid item className="account-info-field">
                            <Typography variant="h5">{convertFieldName(value) + ':'}</Typography>
                        </Grid>
                        <Grid item className="account-info-field">
                            {editComponent === true ?
                                <Input value={getInformationValues(value)} onChange={(event) => {handleChange(event.target.value, value)}} />
                            :
                                <Typography variant="h5">{getInformationValues(value)}</Typography>
                            }
                        </Grid>
                    </Grid>
                ))}
                {editComponent ?                 <Grid item>
                    <Button variant="contained" onClick={() => handleSubmit()}>Confirm Changes</Button>
                </Grid> : ''}
            </Grid>
    );

}

export default AccInfoblock;