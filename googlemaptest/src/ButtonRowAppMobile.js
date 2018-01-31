
import React from 'react';
import ReactDOM from 'react-dom';

class ButtonRowAppMobile extends React.Component {

  render() {
    return (
      <div className='buttonRowMobWrapper'>
        <div className='buttonRowAppMobile'>
          <i title='property type' className="fa fa-home hvr-grow" onClick={this.handleChartRender}></i>
          <i title='crime data'  className='fa fa-balance-scale hvr-grow'></i>
          <i title='broadband speed' className="fa fa-wifi hvr-grow"></i>
        </div>
      </div>
    )
  }
}

// how to handle state/props here - this used to be on App, same page as the function handleChartRender, which just flipped the state flag boolean.




export default ButtonRowAppMobile;