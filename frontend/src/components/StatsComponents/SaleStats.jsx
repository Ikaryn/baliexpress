import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import API from '../../util/API';
import CanvasJSReact from '../../canvasjs/canvasjs.react';
const api = new API();
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const SaleStats = ({sale}) => {
    console.log(sale)

    const [chartOptions, setChartOptions] = React.useState(null);
    
    React.useEffect(() => {
        (async () => {
            const data = await api.get(`stats?saleId=${sale.id}`);
            const dps = JSON.parse(JSON.stringify(data.stats));
            dps.forEach((stat) => stat.x = new Date(stat.x))
            const options = {
                zoomEnabled: true,
                title: {
                    text: sale.name + ' Sale Statistics',
                },
                axisY: {
                    title: 'Units Sold'
                },
                axisX: {
                    title: 'Date'
                },
                data: [
                    {
                        type: 'line',
                        dataPoints: dps
                    }
                ]
                
            }
            setChartOptions(options);
            console.log(data.stats);
        })();
        
    }, [sale.id]);
    
    
    return(
        <Grid>
            <CanvasJSChart options={chartOptions} />
        </Grid>
    );
}

export default SaleStats;