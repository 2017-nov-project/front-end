import React, { Component } from 'react';
import Map from './Map.js'
import './App.css';
import ChartPropertyType from './Chart-PropertyType.js'
import ChartNewOld from './Chart-NewOld.js'



class App extends Component {
  state = {
    averagePrice: 0,
    userInputPostcode: null,
    showChart: false,
    errorMsg: ''
  }

  handleSubmit = event => {
    this.setState({
      userInputPostcode: event.target.value.toUpperCase(),
      errorMsg: ''
    })
  }



  getAveragePriceByPostcode = (event) => {
    event.preventDefault()
    let postcode = this.state.userInputPostcode
    if (postcode.match(/.\d/)) {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/postcode/${postcode}/average_price`)
    .then(res => res.json())
    .then(res =>
      this.setState({averagePrice: res[0].average}))
    } else {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/town/${postcode}/average_price`)
    
    .then(res => res.json())
    .then(res =>
      this.setState({averagePrice: res[0].average})
    )
    .catch(err =>
      this.setState({errorMsg: 'information not found'}))
    }
  }
 


  render() {
    return (
      <div className="App">
        <h1 className="app-title">homeTown</h1>
        <h4 className="app-subtitle">find average sold prices, crime data, broadband speed and more in your area</h4>
    
      <div className='wrapper'>
          {/* <div className='ChartArea'>
          <ChartPropertyType />
          <ChartNewOld />
          </div> */}


        <div className='inputrow'>
          <form onSubmit={this.getAveragePriceByPostcode}><input className='postcodeInput' placeholder='enter postcode' type="text" onChange={this.handleSubmit} ></input></form>
          <p className='errHandle'>{this.state.errorMsg}</p>
        </div>
        <div className='inputrow2'>
          <select name="radius"><option>radius</option>
            <option>1 mile</option>
            <option>3 miles</option>
            <option>5 miles</option>
            <option>10 miles</option>
          </select>
          <select name="radius"><option>property type</option>
            <option>flat</option>
            <option>terrace</option>
            <option>semi-detached</option>
            <option>detached</option>
            </select>
          </div>

 {/* mobile sidebar - horizontal */}

        <div class='sidebarHoriz'>
         <div class='horizRow1'>
    
           <h4 className='avSoldPriceTitle'>average sold price</h4>
           <h4 className='valueChangeTitle'>value change in last...</h4>
         </div>
         <div class='horizRow2'>
           <h5 className='avSoldPriceAmount'>£{this.state.averagePrice}</h5>
           <h5 className='plusAmount'>+ 4.8%</h5>
         </div>
         <div className='row3wrap'>
           <div class='horizRow3'>
             <div id='12m'>12m</div>
             <label class="switch">
               <input type="checkbox"/>
               <span class="slider round"></span>
             </label>
             <div id='5y'>5yr</div>
             </div>
           </div>
       </div>

      {/* desktop sidebar - vertical */}

      <div className='mapAndSidebar'>
        <div className='mapArea'>
            <Map />
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
