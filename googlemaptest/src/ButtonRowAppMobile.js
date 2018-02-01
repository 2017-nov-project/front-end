
import React from 'react';


class ButtonRowAppMobile extends React.Component {

  render() {
    return (
      <div className='buttonRowMobWrapper'>
        <div className='buttonRowAppMobile'>
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


export default ButtonRowAppMobile;