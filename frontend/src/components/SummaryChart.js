import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SummaryChart = ({ props,stockValue }) => {
    // Extract data from data1.chart1Data
    const data = props.results ? props.results.map(result => ({
      x: result.t, // Date
      y: result.c // Close price
    })) : [];

  
    const chartColor =stockValue >= 0 ? 'green' : 'red';
  
    // Highcharts configuration options for Chart1
    const options = {
      chart: {
        backgroundColor: '#f3f3f3', // Set chart background color to grey
      },
      title: {
        text: `${props.ticker} Hourly Price Variation`
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: ''
        },
        opposite: true, // Place y-axis on the right side
      },
      series: [{
        data: data,
        showInLegend:false,
        marker: {
          enabled: false // Disable markers (dots)
        },
        color: chartColor, 
      }],
      tooltip: {
        formatter: function() {
          return `<b>${props.ticker}</b>: ${this.y}`;
        }
      }
    };
  
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  };

  export default SummaryChart;