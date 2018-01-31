import React from 'react';
import ReactDOM from 'react-dom';

class SidebarHoriz extends React.Component {

  render() {
    return (
      <div className='sidebarHoriz'>
        <div className='horizRow1'>
          <h4 className='avSoldPriceTitle'>average sold price</h4>
          <h4 className='valueChangeTitle'>value change in last...</h4>
        </div>
        <div className='horizRow2'>
          <h5 className='avSoldPriceAmount'>£{this.props.averagePrice}</h5>
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
    )
  }
}


export default SidebarHoriz;