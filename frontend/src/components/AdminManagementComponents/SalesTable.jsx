import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';

const SalesTable = ({sales, setSaleComponent}) => {

    return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((sale, index) => (
                            <TableRow key={sale.name+sale.id}>
                                <TableCell>{sale.id}</TableCell>
                                <TableCell>{sale.name}</TableCell>
                                <TableCell>{sale.startdate}</TableCell>
                                <TableCell>{sale.enddate}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => {setSaleComponent(index)}}
                                    >
                                        View details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default SalesTable;