import React from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';

class ChartNewOld extends React.Component {
  state = {
    data: [],
    loading: true
  }

  componentDidMount(event) {
    let averagePriceByType = [];
    this.fetchAverageByType('Y')
      .then(res => averagePriceByType.push(res))
      .then(() => this.fetchAverageByType('N'))
      .then(res => averagePriceByType.push(res))
      .then(() => {
        this.setState({ data: averagePriceByType, loading: false })
      });
  }

  fetchAverageByType(type) {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/average_price?new_build=${type}`)
      .then(resbuffer => resbuffer.json())
      .then(res => res[0].average);
  };

  render() {
    const chartData = {
      labels: ['Newly Developed','Current'],
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [
            'rgba(255, 99, 130, 0.6)',
            'rgba(30, 99, 100, 0.6)'
          ],
          label: 'Old-New'
        }
      ]
    };
    return (
      <div className="chart">
        {this.state.loading
          ? <div></div>
          : <Polar
            data={chartData}
            width={500}
            height={600}
            options={{
              maintainAspectRatio: false
            }}
          />
        }
      </div>
    )
  }
};

export default ChartNewOld;