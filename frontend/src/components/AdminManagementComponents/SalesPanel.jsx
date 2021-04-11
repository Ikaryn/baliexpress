import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';

const SalesPanel = () => {

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
                </Table>
            </TableContainer>
    )
}

export default SalesPanel;