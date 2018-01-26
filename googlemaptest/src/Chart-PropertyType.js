import React from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';

class ChartPropertyType extends React.Component {
  state = {
    data: [],
    loading: true
  }

  componentDidMount(event) {
    let averagePriceByType = [];
    this.fetchAverageByType('D')
      .then(res => averagePriceByType.push(res))
      .then(() => this.fetchAverageByType('S'))
      .then(res => averagePriceByType.push(res))
      .then(() => this.fetchAverageByType('T'))
      .then(res => averagePriceByType.push(res))
      .then(() => this.fetchAverageByType('F'))
      .then(res => averagePriceByType.push(res))
      .then(() => {
        this.setState({ data: averagePriceByType, loading: false })
      });
  }

  fetchAverageByType(type) {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/average_price?property_type=${type}`)
      .then(resbuffer => resbuffer.json())
      .then(res => res[0].average);
  };

  render() {
    const chartData = {
      labels: ['Detached', 'Semi-detached', 'Terraced', 'Flat'],
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [
            'rgba(255, 99, 130, 0.6)',
            'rgba(30, 99, 100, 0.6)',
            'rgba(255, 99, 50, 0.6)',
            'rgba(178, 40, 50, 0.6)',
            'rgba(255, 10, 50, 0.8)'
          ]
        }
      ]
    };
    return (
      <div className="chart">
        {this.state.loading
          ? <div></div>
          : <Polar
            data={chartData}
            width={400}
            height={500}
            options={{
              maintainAspectRatio: false
            }}
          />
        }
      </div>
    )
  }
};

export default ChartPropertyType;