import { Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import API from '../../util/API';
import SaleStats from '../StatsComponents/SaleStats'

const api = new API();

const SaleInformation = ({saleId}) => {

    console.log(saleId);
    const [sale, setSale] = React.useState(null);

    React.useEffect(() => {
        (async () => {

            const response = await api.get(`sales?saleId=${saleId}`);

            console.log(response);
            setSale(response.sale);
        })();
    },[])

    return (
        
        <Grid>
            {sale ?
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">Sale Data - {sale.name}</Typography>
                    </Grid>
                    <Grid container item direction="row" justify="space-evenly"> 
                        <Grid item>
                            <Typography variant="h6">{sale.startdate}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">to</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{sale.enddate}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <SaleStats sale={sale}/>
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
                                    {sale.productList.map((product) => (
                                        <TableRow>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.salepercent}</TableCell>
                                            <TableCell>{product.saleSold}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            : <LinearProgress />}
        </Grid>
    )

}

export default SaleInformation;