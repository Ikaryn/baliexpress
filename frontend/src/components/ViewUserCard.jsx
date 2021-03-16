import { Button, Grid, Input, Typography, Card, CardContent, CardActions, Select, MenuItem } from '@material-ui/core';
import React from 'react';

const ViewUsers = ({user}) => {
    const [expand, setExpand] = React.useState(false);
    const [role, setRole] = React.useState(user.userInfo.admin == 'True');
    function handleSelectChange(event) {
        if(window.confirm('Are you sure you want to change ' + user.userInfo.email + '\'s role?')){
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