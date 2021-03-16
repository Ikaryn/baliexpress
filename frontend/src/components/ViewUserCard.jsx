import { Button, Grid, Input, Typography, Card, CardContent, CardActions, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
const api = new API();
const ViewUsers = ({user}) => {
    const [expand, setExpand] = React.useState(false);
    const [role, setRole] = React.useState(user.userInfo.admin);
    console.log(role, user.userInfo.admin, user.userInfo.email);
    async function handleSelectChange(event) {
        if(window.confirm('Are you sure you want to change ' + user.userInfo.email + '\'s role?')){
            const options = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Request-Type': 'admin status',
                },
                body: JSON.stringify({
                    admin: true
                })
            }
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`profile/${userId}?userId=${userId}`, options);
            setRole(event.target.value);
        }
    }
    return(
        <Card>
            {expand ? 
                <CardContent>
                    <Typography>
                        {"Email: " + user.userInfo.email}
                    </Typography>
                    <Typography>
                        {"ID: " + user.userId}
                    </Typography>
                    <Typography>
                        {"Name: " + user.userInfo.name}
                    </Typography>
                    <Typography>
                        {"Phone: " + user.userInfo.phone}
                    </Typography>
                    <Typography>
                        {"Address: " + user.userInfo.streetAddress + ", " + 
                            user.userInfo.city + ", " + 
                            user.userInfo.postcode + ", " + 
                            user.userInfo.country
                        }
                    </Typography>
                    <Typography>
                        Role: 
                        <Select
                            value={role}
                            onChange={(event) => handleSelectChange(event)}
                        >
                            <MenuItem value={false}>User</MenuItem>
                            <MenuItem value={true}>Admin</MenuItem>
                        </Select>
                    </Typography>
                </CardContent>:
                <CardContent>
                    <Typography>
                        {"Email: " + user.userInfo.email}
                    </Typography>
                </CardContent>                
            }
            {expand ? 
                <CardActions>
                        <Button size="small" onClick={() => {setExpand(false)}}>Close</Button>
                </CardActions> :
                <CardActions>
                    <Button size="small" onClick={() => {setExpand(true)}}>Expand</Button>
                </CardActions>            
            }
        </Card>
    )
}

export default ViewUsers;