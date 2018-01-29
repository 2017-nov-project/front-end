import React from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';

class ChartType extends React.Component {
  state = {
    data: [],
    loading: true,
    searchType: 'county',
    search: 'HERTFORDSHIRE'
  }

  componentDidMount(event) {
    let averagePriceByCounty = [];
    const propertyTypes =  ['D', 'S', 'T', 'F' ];
    return Promise.all(propertyTypes.map( type => {
      return this.fetchAverageByType(this.state.searchType, this.state.search, type)
    })).then(averagePriceByCounty => this.setState({ data: averagePriceByCounty, loading: false }))
  }

  componentWillReceiveProps = (props) => {
    console.log(props)
    // receives searchType and userInput (postcode, town...) from App.js
    //will need property types?
  }

  fetchAverageByType(searchType, search, propertyType) {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/${searchType}/${search}/average_price?property_type=${propertyType}`)
      .then(resbuffer => resbuffer.json())
      .then(res => {
        if (res.average) {
          return res.average
        } else {
          return 0
        }
      })
  }

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