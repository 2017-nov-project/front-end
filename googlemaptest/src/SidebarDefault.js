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
        <h4 className='avSoldPriceTitle'>average sold price in {this.props.userInput}</h4>
        <h5 className='avSoldPriceAmount'>£{this.props.avgSoldPrice.toLocaleString('en', {maximumFractionDigits: 0})}</h5>
      </div>
    )
  }
}





export default SidebarDefault;

