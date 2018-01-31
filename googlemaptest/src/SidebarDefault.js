
import React from 'react';
import ReactDOM from 'react-dom';

class SidebarDefault extends React.Component {

  render() {
    return (
      <div className='sidebarDefault'>
        <h4 className='avSoldPriceTitle'>average sold price</h4>
        <h5 className='avSoldPriceAmount'>£{this.props.averagePrice}</h5>
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
      </div>
    )
  }
}





export default SidebarDefault;