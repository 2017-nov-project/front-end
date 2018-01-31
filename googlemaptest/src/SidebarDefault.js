import React from 'react';


class SidebarDefault extends React.Component {
  componentWillReceiveProps(newProps) {
    if(this.props !== newProps) {
    const avgSoldPrice = newProps
    }
  }

  render() {
    return (
      <div className='sidebarDefault'>
        <h4 className='avSoldPriceTitle'>average sold price</h4>
        <h5 className='avSoldPriceAmount'>£{this.props.avgSoldPrice.toFixed()}</h5>
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