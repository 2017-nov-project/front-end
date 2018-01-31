
import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

  render() {
    return (
      <header>
        <i className="fa fa-home" id='logoHouse'></i>
        <h1 className="app-title">homeTown</h1>
        <h4 className="app-subtitle">find average sold prices, crime data, broadband speed and more in your area</h4>
      </header>
    )
  }
}




export default Header;