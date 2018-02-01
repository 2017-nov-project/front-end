import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PropertyTypeChart extends Component {
  state = {
    data: [],
    loading: true,
    searchType: 'town',
    search: 'london'
  };

  componentDidMount(event) {
    const propertyTypes = ['D', 'S', 'T', 'F', 'O'];

    return Promise.all(propertyTypes.map(type => {
      return this.fetchAverage(this.state.searchType, this.state.search, type);
    })).then(data => this.setState({ data, loading: false }));
  };

  fetchAverage(searchType, search, propertyType) {
    const domain = 'https://peaceful-waters-20110.herokuapp.com/api';
    const path = (searchType && search) ? `${searchType}/${search}/average_price?property_type=${propertyType}` : `/average_price?property_type=${propertyType}`;
    return fetch(`${domain}/${path}`)
      .then(buffer => buffer.json())
      .then(res => res.average);
  };

  render() {
    const { searchType, search } = this.state;
    const chartData = {
      labels: ['Detached', 'Semi-detached', 'Terraced', 'Flat', 'Others'],
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [
            '#B3D9FE',
            '#505052',
            '#9C4E3E',
            '#ECBE92',
            '#DA7A4F'
          ],
          label: 'ChartType'
        }
      ]
    };
    return (
      <div className="chart">
        {this.state.loading
          ? <div></div>
          : <Pie
            data={chartData}
            width={600}
            height={600}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: (searchType && search) ? `${searchType} : ${search}` : 'All UK',
                fontFamily: 'Quicksand',
                fontSize: 20,
                padding: 10
              },
            }}
          />
        }
      </div>
    )
  }
};

export default PropertyTypeChart;