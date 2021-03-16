import { Button, Grid, Input, Typography } from '@material-ui/core';
import React from 'react';
import ViewUserCard from './ViewUserCard';
const ViewUsers = ({}) => {
    const [users, setUsers] = React.useState(
        [{'userId': 1529870708,
        'userInfo': {  'name': 'John Smith',
                    'email': 'johnS@gmail.com',
                    'password': 'asdfasdf',
                    'phone':'12345678',
                    'admin': 'True',
                    'streetAddress': '35E Crapperdown Road',
                    'city': 'Austin',
                    'country': 'USA',
                    'postcode': '67553'},
        'builds': [],
        'orders': []},
        {'userId': 3533306566,
            'userInfo': {'name': 'Kevin Eleven',
                        'email': 'K11@gmail.com',
                        'password': 'fdsafdsa',
                        'phone':'87654321',
                        'admin': 'False',
                        'streetAddress': '24 Bellavista Road',
                        'city': 'Sydney',
                        'country': 'Australia',
                        'postcode': '2327'},
            'builds': [],
            'orders': []},
        {'userId': 2624841935,
            'userInfo': {'name': 'Jen',
                        'email': 'jen@gmail.com',
                        'password': 'aaabbbccc',
                        'phone':'10101010',
                        'admin': 'False',
                        'streetAddress': '1 Tong Street',
                        'city': 'Kyoto',
                        'country': 'Japan',
                        'postcode': '3456'},
        'builds': [],
        'orders': []},]
    );

    return(
        <Grid container item direction="column" className="information-tab">
            {users.map((user) =>
                <ViewUserCard user={user}/>
            )}
        </Grid>
    )
}

export default ViewUsers;