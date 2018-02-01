import React from 'react';
import { Radar } from 'react-chartjs-2';

const ChartRadar = () => {
  const chartData = {
    labels: [   'Detached', 
                'Semi Detached',
                'Terraced', 
                'Flat'
              ],
    datasets: [
      {
        data: [225354, 160000, 170000, 130000],
        backgroundColor: [
          'rgba(200, 70, 0, .3)',
        ],
        label: ['Wales']
      },
      {
        data: [225000, 197000, 225098, 150000],
        backgroundColor: [
          'rgba(200, 200, 0, .3)',
        ],
        label: ['England']
      },
      {
        data: [220000, 180000, 190000, 160000],
        backgroundColor: [
          'rgba(0, 0, 200, .3)',
        ],
        label: ['Scotland']
      },
      {
        data: [210000, 160000, 150000, 189000],
        backgroundColor: [
          'rgba(0, 120, 0, .3)',
        ],
        label: ['Ireland']
      },
    ]
  };
  return (
    <div className="chart">
         <Radar
          data={chartData}
          width={500}
          height={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `Average House Prices in UK`,
              fontFamily: 'Quicksand',
              fontSize: 20,
              padding:10
               },
               scale: {
                ticks: {
                   maxTicksLimit: 3
                },
                gridLines: {
                  display: false
               }
             }
          }}
        />
      
    </div>
  )
  }

export default ChartRadar;