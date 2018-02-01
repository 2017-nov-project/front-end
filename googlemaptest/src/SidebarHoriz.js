import React from 'react';


class SidebarHoriz extends React.Component {
  componentWillReceiveProps(newProps) {
    if(this.props !== newProps) {
    const avgSoldPrice = newProps
    }
  }

  render() {
    return (
      <div className='sidebarHoriz'>
        <div className='horizRow1'>
          <h4 className='avSoldPriceTitle'>average sold price in {this.props.userInput}</h4>
        </div>
        <div className='horizRow2'>
          <h5 className='avSoldPriceAmount'>£{this.props.avgSoldPrice.toLocaleString('en', {maximumFractionDigits: 0})}</h5>
       </div>
      </div>
    )
  }
}


export default SidebarHoriz;