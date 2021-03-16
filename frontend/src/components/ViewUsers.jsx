import { Button, Grid, Input, Typography } from '@material-ui/core';
import React from 'react';
import ViewUserCard from './ViewUserCard';
import API from '../util/API';
const api = new API();
const ViewUsers = ({}) => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            //const res = await api.get();
            const res = [];
            setUsers(res);
        })();
    },[users])

    return(
        <Grid container item direction="column" className="information-tab">
            {users.map((user) =>
                <ViewUserCard user={user}/>
            )}
        </Grid>
    )
}

export default ViewUsers;