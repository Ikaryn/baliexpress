import { Button, Grid, Input, Typography, Card, CardContent, CardActions, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
const api = new API();
const ViewUsers = ({user}) => {
    const [expand, setExpand] = React.useState(false);
    const [role, setRole] = React.useState(user.admin);
    console.log(role, user.admin, user.email);
    async function handleSelectChange(event) {
        if(window.confirm('Are you sure you want to change ' + user.email + '\'s role?')){
            console.log(user.userId);
            // const options = {
            //     method: 'PUT',
            //     headers: { 
            //         'Content-Type': 'application/json',
            //         'Request-Type': 'admin status',
            //     },
            //     body: JSON.stringify({
            //         admin: event.target.value,
            //         userId: user.userId
            //     })
            // }

            const body = {
                            admin: event.target.value,
                            userId: user.userId
                        }

            const userId = localStorage.getItem('userId');
            const res = await api.put(`profile?changeAdmin=${true}&userId=${userId}`, body);
            console.log(res);
            setRole(event.target.value);
        }
    }
    return(
        <Card>
            {expand ? 
                <CardContent>
                    <Typography>
                        {"Email: " + user.email}
                    </Typography>
                    <Typography>
                        {"ID: " + user.userId}
                    </Typography>
                    <Typography>
                        {"Name: " + user.name}
                    </Typography>
                    <Typography>
                        {"Phone: " + user.phone}
                    </Typography>
                    <Typography>
                        {"Address: " + user.streetAddress + ", " + 
                            user.city + ", " + 
                            user.postcode + ", " + 
                            user.country
                        }
                    </Typography>
                </CardContent>:
                <CardContent>
                    <Typography>
                        {"Email: " + user.email}
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