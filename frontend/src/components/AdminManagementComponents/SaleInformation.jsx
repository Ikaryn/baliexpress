import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';

const SaleInformation = ({saleInfo}) => {
    console.log(saleInfo);
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h4">Sale Data</Typography>
            </Grid>
            <Grid container item direction="row" justify="space-evenly"> 
                <Grid item>
                    <Typography>{saleInfo.startdate}</Typography>
                </Grid>
                <Grid item>
                    <Typography>to</Typography>
                </Grid>
                <Grid item>
                    <Typography>{saleInfo.enddate}</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>% Sale</TableCell>
                                <TableCell>Amount Sold</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {saleInfo.productList.map((product) => (
                                <TableRow>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>placeholder for % Sale</TableCell>
                                    <TableCell>placeholder for amount sold</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )

}

export default SaleInformation;