import React from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';

class ChartType extends React.Component {
  state = {
    data: [],
    loading: true,
    searchType: 'county',
    search: 'LONDON'
  }

  componentDidMount(event) {
    let averagePriceByCounty = [];
    this.fetchAverageByType(this.state.searchType,this.state.search, 'D')
      .then(res => averagePriceByCounty.push(res))
      .then(() => this.fetchAverageByType(this.state.searchType,this.state.search, 'S'))
      .then(res => averagePriceByCounty.push(res))
      .then(() => this.fetchAverageByType(this.state.searchType,this.state.search, 'T'))
      .then(res => averagePriceByCounty.push(res))
      .then(() => this.fetchAverageByType(this.state.searchType,this.state.search, 'F'))
      .then(res => averagePriceByCounty.push(res))
      .then(() => {
        this.setState({ data: averagePriceByCounty, loading: false })
      });
  }

  fetchAverageByType(searchType, search, propertyType) {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/${searchType}/${search}/average_price?property_type=${propertyType}`)
      .then(resbuffer => resbuffer.json())
      .then(res => {
        if (res.length) {
          return res[0].average
        } else {
          return 0
        }
      })
  };

  render() {
    const searchtype = this.state.searchType
    const search = this.state.search
    const chartData = {
      labels: ['Detached', 'Semi-detached', 'Terraced', 'Flat'],
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [
            'rgba(255, 0, 0, .65)',
            'rgba(0, 255, 0, .65)',
            'rgba(0, 0, 255, .65)',
            'rgba(220, 220, 0, .65)',
            'rgba(255, 10, 50, 0.8)'
          ],
          label: 'ChartType'
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
              maintainAspectRatio: false,
              title: {
                display: true,
                text: `${searchtype} : ${search}`,
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
};

export default ChartType;