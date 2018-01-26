import React, { Component } from 'react';
import Map from './Map.js'
import './App.css';
import ChartPropertyType from './Chart-PropertyType.js'
import ChartNewOld from './Chart-NewOld.js'
import {getAveragePriceByInput} from './api'


class App extends Component {
  state = {
    averagePrice: 0,
    userInput: null,
    showChart: false,
    errorMsg: ''
  }

  handleSubmit = event => {
    this.setState({
      userInput: event.target.value.toUpperCase(),
      errorMsg: ''
    })
   }

  handleAveragePriceRequest = (event) => {
    event.preventDefault()
    getAveragePriceByInput(this.state.userInput)
    .then(res =>
    this.setState({averagePrice: res[0].average}))
    .catch(err =>
    this.setState({errorMsg: 'information not found'}))
  }
  
  render() {
    return (
      <div className="App">
      <header>
      <i className="fa fa-home" id='logoHouse'></i>
        <h1 className="app-title">homeTown</h1>
        <h4 className="app-subtitle">find average sold prices, crime data, broadband speed and more in your area</h4>
      </header>
      <div className='wrapper'>
          {/* <div className='ChartArea'>
          <ChartPropertyType />
          <ChartNewOld />
          </div> */}


        <div className='inputrow'>
        <form onSubmit={this.handleAveragePriceRequest}><input required title="3 characters minimum" className='postcodeInput' placeholder='enter postcode or town' type="text" onChange={this.handleTyping} ></input></form>
          <p className='errHandle'>{this.state.errorMsg}</p>
        </div>
        <div className='inputrow2'>
          <select name=""><option>search by...</option>
          <option>postcode</option>
            <option>town</option>
            <option>county</option>
            <option>locality</option>
          </select>
          <select name=""><option>property type</option>
            <option>flat</option>
            <option>terrace</option>
            <option>semi-detached</option>
            <option>detached</option>
            </select>
          </div>

 {/* mobile sidebar - horizontal */}

        <div className='sidebarHoriz'>
         <div className='horizRow1'>
    
           <h4 className='avSoldPriceTitle'>average sold price</h4>
           <h4 className='valueChangeTitle'>value change in last...</h4>
         </div>
         <div className='horizRow2'>
           <h5 className='avSoldPriceAmount'>£{this.state.averagePrice}</h5>
           <h5 className='plusAmount'>+ 4.8%</h5>
         </div>
         <div className='row3wrap'>
           <div className='horizRow3'>
             <div id='12m'>12m</div>
             <label className="switch">
               <input type="checkbox"/>
               <span className="slider round"></span>
             </label>
             <div id='5y'>5yr</div>
             </div>
           </div>
       </div>

      {/* desktop sidebar - vertical */}

      <div className='mapAndSidebar'>
        <div className='mapArea'>
            <Map userInput={this.state.userInput}/>
        </div>

            <div className='sidebarDefault'>
              <h4 className='avSoldPriceTitle'>average sold price</h4>
              <h5 className='avSoldPriceAmount'>£{this.state.averagePrice}</h5>
              <h4 className='valueChangeTitle'>value change in last...</h4>
              <h5 className='plusAmount'>+ 4.8%</h5>
              <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
              </label>
                <div className='amounts'>
                  <div>12m</div>
                  <div>5yr</div>
                </div>
            </div> {/* sidebarDefault        */}
          </div>  {/* mapandsidebar */}
        </div> {/* wrapper */}
      </div> 
    );
  }
}



export default App;
