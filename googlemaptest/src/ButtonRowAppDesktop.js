
import React from 'react';


class ButtonRowAppDesktop extends React.Component {
 

  render() {
    //this.props   false
    // but does this need to be on App?
   
    return (
      <div className = 'buttonDeskWrapper'>
        <div className='buttonRowAppDesktop'>
        <i title='property type' className="fa fa-home hvr-grow" onClick={this.props.handleChartRender}></i>
        <i title='crime data'  className='fa fa-balance-scale hvr-grow'></i>
        <i title='broadband speed' className="fa fa-wifi hvr-grow"></i>
      </div>
    </div>
    )
  }
}

// how to handle state/props here - this used to be on App, same page as the function handleChartRender, which just flipped the state flag boolean.




export default ButtonRowAppDesktop;