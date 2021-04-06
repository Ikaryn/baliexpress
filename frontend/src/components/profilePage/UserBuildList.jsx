import React from 'react';
import API from '../../util/API';
import {  Button, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import { StoreContext } from '../../util/store';
const api = new API();

const UserBuildList = () => {
    const context = React.useContext(StoreContext);
    const {build: [,setBuild]} = context;
    const [builds, setBuilds] = React.useState(null);
    const history = useHistory();
    
    React.useEffect(() => {
        (async () => {
            const response = await api.get(`userBuilds?userId=${localStorage.getItem('userId')}`);
            console.log(response);
            console.log(response.builds);
            setBuilds(response.builds);
        })();
    },[])
    
    const handleRedirect = (userid, buildid, build) => {
        console.log(build);
        setBuild(build);
        history.push(`/build/${userid}/${buildid}`);
    }
    
    return(        
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">ID</TableCell>  
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {builds && builds.map((build) => (
                    <TableRow key={build.buildid}>
                        <TableCell>{build.buildid}</TableCell>
                        <TableCell>{build.buildname}</TableCell>
                        <TableCell>{build.description}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={() => {handleRedirect(build.userid, build.buildid, build)}}>Edit Build</Button>
                            <Button variant="contained" color="secondary">Delete Build</Button>
                        </TableCell>
                    </TableRow>  
                ))}
            </TableBody>
        </Table>
    </TableContainer>)

}

export default UserBuildList;