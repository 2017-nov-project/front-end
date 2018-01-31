import React from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';

const ChartBroadband = () => {
  const chartData = {
    labels: [
      'National Average',
      'Mobile Broadband',
      'Virgin Media',
      'Vodafone Home',
      'EE (mobile)',
      'Plusnet',
      'Vodafone (mobile)',
      'Sky Broadband',
      'EE Home',
      'TalkTalk',
      'O2 (mobile)',
      'Three (mobile)',
      'Post Office'
    ],
    
    datasets: [
      {
        data: [27.09, 20.5, 60.36, 26.34, 25.32, 23.81, 18.45, 16.7, 16.67, 14.33,13.74, 7],
        backgroundColor: [
          'rgba(255, 110, 20, .4)',
          'rgba(190, 255, 68, .4)',
          'rgba(140, 90, 255, .4)',
          'rgba(220, 20, 45, .4)',
          'rgba(255, 10, 50, 0.4)',
          'rgba(255, 90, 50, .45)',
          'rgba(240, 255, 29, .35)',
          'rgba(120, 260, 255, .45)',
          'rgba(220, 159, 50, .45)',
          'rgba(140, 90, 200, .45)',
          'rgba(60, 160, 45, .45)',
          'rgba(90, 190, 50, 0.4)',
          'rgba(180, 90, 50, 0.45)',
          'rgba(50, 230, 255, 0.45)',
          'rgba(90, 190, 50, 0.4)',
          'rgba(180, 90, 50, 0.45)',
          'rgba(50, 230, 255, .35)'
        ],
        borderColor:[
          'rgba(255, 110, 20, .9)',
          'rgba(190, 255, 68, .9)',
          'rgba(140, 90, 255, .9)',
          'rgba(220, 20, 45, .9)',
          'rgba(255, 10, 50, 0.9)',
          'rgba(255, 90, 50, .9)',
          'rgba(240, 255, 29, .9)',
          'rgba(120, 260, 255, .95)',
          'rgba(220, 159, 50, .95)',
          'rgba(140, 90, 200, .95)',
          'rgba(60, 160, 45, .9)',
          'rgba(90, 190, 50, 0.9)',
          'rgba(180, 90, 50, 0.85)',
          'rgba(50, 230, 255, 0.85)',
          'rgba(90, 190, 50, 0.8)',
          'rgba(180, 90, 50, 0.85)',
          'rgba(50, 230, 255, .85)'
        ],
        borderWidth: 2,
        label: 'Broadband speed in mb/s'
      }
    ]
  };
  return (
    <div className= "ChartBroadband">
         <Bar
          data={chartData}
          width={500}
          height={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: `Broadband Data`,
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

export default ChartBroadband;