import React from 'react';
import API from '../../util/API';
import {  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
const api = new API();

const UserBuildList = () => {
    const [builds, setBuilds] = React.useState(null);
    
    React.useEffect(() => {
        (async () => {
            const response = await api.get(`userBuilds?userId=${localStorage.getItem('userId')}`);
            console.log(response);
            setBuilds(response.builds);
        })();
    },[])
    
    return(        
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">ID</TableCell>  
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {builds.map}
            </TableBody>
        </Table>
    </TableContainer>)

}

export default UserBuildList;