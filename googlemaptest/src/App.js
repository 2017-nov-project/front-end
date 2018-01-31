import React, { Component } from 'react';
import Map from './Map.js'
import SidebarHoriz from './SidebarHoriz.js'
import SidebarDefault from './SidebarDefault.js'
import Header from './Header.js'
import ButtonRowAppDesktop from './ButtonRowAppDesktop.js'
import ButtonRowAppMobile from './ButtonRowAppMobile.js'
import './App.css';
import ChartPropertyType from './Chart-PropertyType.js'
import { searchForAvgPriceOnUserInput } from './api'


class App extends Component {
  state = {
    averagePrice: 7,
    userInput: '',
    searchType: '',
    showChart: false,
    errorMsg: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.searchForAvgPriceOnUserInput(this.state.userInput)
  }

  handleUserInput = e => {
    e.preventDefault();
    this.setState ({userInput: e.target.value})
  }

  searchForAvgPriceOnUserInput = searchForAvgPriceOnUserInput.bind(this);

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
          {this.state.showChart ? <ChartPropertyType /> : <Map userInput={userInput} searchType={searchType} />}
        <SidebarDefault avgSoldPrice = {this.state.averagePrice}/>
      </div>  {/* mapandsidebar */}
     </div>  {/* mapSideWrapper */}
    </div> {/* wrapper */}
  </div> 
  )}
}



export default App;
