import React from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';

const ChartCrime = () => {
  const chartData = {
    labels: [
                'Anti-social behaviour',
                'Vehicle crime', 
                'Criminal damage', 
                'Shoplifting',
                'Drugs',
                'Public Disorder',
                'Arson',
                'Other theft',
                'Other crime',
                'Violent crime'
              ],
    datasets: [
      {
        data: [10.3, 20.5, 30.7, 15.7, 16.3, 17.4, 5, 6.9, 9.5, 4],
        backgroundColor: [
          'rgba(255, 110, 20, .65)',
          'rgba(190, 255, 68, .65)',
          'rgba(140, 90, 255, .65)',
          'rgba(220, 20, 45, .65)',
          'rgba(255, 10, 50, 0.8)',
          'rgba(255, 90, 50, .65)',
          'rgba(240, 255, 29, .65)',
          'rgba(120, 260, 255, .65)',
          'rgba(220, 159, 50, .65)'
        ],
        label: 'ChartType'
      }
    ]
  };
  return (
    <div className="chart">
         <Polar
          data={chartData}
          width={500}
          height={600}
          options={{
            
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `Crime Data`,
              fontFamily: 'Quicksand',
              fontSize: 20,
              padding:10
               },
          }}
        />
      }
    </div>
  )
  }

  

export default ChartCrime;