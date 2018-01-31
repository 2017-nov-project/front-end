import React, { Component } from 'react';
import Map from './Map.js'
import SidebarHoriz from './SidebarHoriz.js'
import SidebarDefault from './SidebarDefault.js'
import Header from './Header.js'
import ButtonRowAppDesktop from './ButtonRowAppDesktop.js'
import ButtonRowAppMobile from './ButtonRowAppMobile.js'
import './App.css';
import ChartPropertyType from './Chart-PropertyType.js'
import { searchForAvgPriceOnUserInput, fetchCoordinatesByInput } from './api'


class App extends Component {
  state = {
    averagePrice: 0,
    userInput: '',
    showChart: false,
    errorMsg: '', 
    center: {
      lat:  53.486051,
      lng: -2.239902
    },
  }

  handleSubmit = e => {
    e.preventDefault();
    return Promise.all([
      searchForAvgPriceOnUserInput(this.state.userInput),
      fetchCoordinatesByInput(this.state.userInput)
    ])
      .then(([{average}, {longitude, latitude}]) => {
        const center = {lat: latitude, lng: longitude}
        this.setState({averagePrice: average, center })
      })
  }

  handleUserInput = e => {
    e.preventDefault();
    this.setState ({userInput: e.target.value})
  }



  handleChartRender = () => this.setState({showChart: !this.state.showChart})
  
  render() {
    const { userInput, searchType } = this.state

    return (
      <div className="App">
        <Header />
        <div className='wrapper'>

        <div className='inputrow'>
          <form onSubmit={this.handleSubmit}>
            <input className='postcodeInput' placeholder='enter postcode or town' onChange={this.handleUserInput} type="text" value={this.state.userInput}/>
            <p className='errHandle'>{this.state.errorMsg}</p>
          </form>
        </div>
        <ButtonRowAppDesktop props = {this.state.showChart}/>
        <SidebarHoriz avgSoldPrice = {this.state.averagePrice}/>
        <ButtonRowAppMobile props = {this.state.showChart}/>
        <div className = 'mapSideWrapper'>
          <div className='mapAndSidebar'>
          {this.state.showChart ? <ChartPropertyType /> : <Map  coords={this.state.center} />}
        <SidebarDefault avgSoldPrice = {this.state.averagePrice}/>
      </div>  {/* mapandsidebar */}
     </div>  {/* mapSideWrapper */}
    </div> {/* wrapper */}
  </div> 
  )}
}



export default App;
