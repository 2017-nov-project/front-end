import React, { Component } from 'react';
import Map from './Map.js'
import SidebarHoriz from './SidebarHoriz.js'
import SidebarDefault from './SidebarDefault.js'
import Header from './Header.js'
import ButtonRowAppDesktop from './ButtonRowAppDesktop.js'
import ButtonRowAppMobile from './ButtonRowAppMobile.js'
import './App.css';
import PropertyTypeChart from './PropertyTypeChart.js'
import ChartCrime from './Chart-Crime.js'
import ChartBroadband from './Chart-Broadband.js'
import ChartRadar from './Chart-Radar.js'
import { searchForAvgPriceOnUserInput, fetchCoordinatesByInput } from './api'


class App extends Component {
  state = {
    averagePrice: 0,
    userInput: '',
    showCrimeChart: false,
    showBBChart: false,
    showRadarChart: false,
    showTypeChart: false,
    errorMsg: '', 
    center: {
      lat:  53.486051,
      lng: -2.239902
    },
    selected : true
  }

  handleShowCrimeChart = (event) => {
    this.setState({
      showCrimeChart: !this.state.showCrimeChart,
      showBBChart: false,
      showTypeChart: false,
      showRadarChart: false
    })
  }

  handleShowBBChart = (event) => {
    this.setState({
      showBBChart: !this.state.showBBChart,
      showCrimeChart: false,
      showTypeChart: false,
      showRadarChart: false
    })
  }

  handleShowTypeChart = (event) => {
    this.setState({
      showTypeChart: !this.state.showTypeChart,
      showBBChart: false,
      showCrimeChart: false,
      showRadarChart: false
    })
  }

  handleShowRadarChart = (event) => {
    this.setState({
      showRadarChart: !this.state.showRadarChart,
      showTypeChart: false,
      showBBChart: false,
      showCrimeChart: false
    })
  }
  
  handleSubmit = e => {
    e.preventDefault();
    return Promise.all([
      searchForAvgPriceOnUserInput(this.state.userInput),
      fetchCoordinatesByInput(this.state.userInput)
    ])
      .then(async ([{ average }, { coordinates }]) => {
        average = average ? average : 0
        const center = { lat: coordinates.latitude, lng: coordinates.longitude }
        this.setState({ averagePrice: average, center, errorMsg: '' })
      })
      .catch(err =>
        this.setState({ errorMsg: 'information not found' }))
  }
  

  handleUserInput = e => {
    e.preventDefault();
    this.setState ({userInput: e.target.value})
  }

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
            <ButtonRowAppDesktop handleShowCrimeChart = {this.handleShowCrimeChart} handleShowBBChart = {this.handleShowBBChart} handleShowTypeChart = {this.handleShowTypeChart} handleShowRadarChart={this.handleShowRadarChart}/>
            <SidebarHoriz avgSoldPrice = {this.state.averagePrice} userInput = {this.state.userInput}/>
            <ButtonRowAppMobile handleShowCrimeChart = {this.handleShowCrimeChart} handleShowBBChart = {this.handleShowBBChart} handleShowTypeChart = {this.handleShowTypeChart}/>
              <div className = 'mapSideWrapper'>
                <div className='mapAndSidebar'>
                  {this.state.showCrimeChart ? <ChartCrime/> : 
                    this.state.showBBChart ? <ChartBroadband /> : 
                      this.state.showTypeChart ? <PropertyTypeChart /> : 
                        this.state.showRadarChart ? <ChartRadar /> : 
                          <Map coords={this.state.center} />}
                  <SidebarDefault avgSoldPrice = {this.state.averagePrice} userInput = {this.state.userInput}/>
                </div>  {/* mapandsidebar */}
              </div>  {/* mapSideWrapper */}
         </div> {/* wrapper */}
      </div> 
  )}
}



export default App;
