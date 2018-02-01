
import React from 'react';


class ButtonRowAppDesktop extends React.Component {

  render() {
  return (
      <div className = 'buttonDeskWrapper'>
        <div className='buttonRowAppDesktop'>
        <i title='property type' className="fa fa-home hvr-grow" onClick={this.props.handleShowTypeChart}></i>
        <i title='crime data'  className='fa fa-balance-scale' onClick={this.props.handleShowCrimeChart}></i>
        <i title='broadband speed' className="fa fa-wifi hvr-grow" onClick={this.props.handleShowBBChart}></i>
        <i title='regional comparison' className="fa fa-area-chart hvr-grow"></i>
        <i title='placeholder' className="fa fa-ambulance hvr-grow" ></i>
      </div>
    </div>
  )
 }
}


export default ButtonRowAppDesktop;


