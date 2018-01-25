import React from 'react';
import ReactDOM from 'react-dom';
import postcodesData from './data/postcodesData.js'
// import housesData from './data/housesData.js'
import _ from 'lodash';

const google = window.google;




class Map extends React.Component {

  state = {
    center: {
      lat:  53.486051,
      lng: -2.239902
    },
    zoom: 16,
    isHeatmap: false,
    coords: []
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.state.center,
      zoom: this.state.zoom
    });
    this.map.addListener('zoom_changed', () => {
      this.handleZoom()
    });
    this.map.addListener('center_changed', () => {
       this.handleCenter()
    });
  }

  handleZoom = event => {
      this.setState({
        zoom: this.map.getZoom(),
      });
    }

  handleCenter = event => {
    let newMap = this.map.getCenter()
    let newLat = newMap.lat()
    let newLng = newMap.lng()
    console.log(newMap)
    console.log(newLat)
    console.log(newLng)
    let center = {...this.state.center}
    center.lat = newMap.lat()
    center.lng = newMap.lng()
      this.setState({center});
  }


   getCoordsFromPostcode = postcodesData => {
    const locations = postcodesData.map(element => {
      const {postcode, latitude, longitude} = element.result;
      return {postcode, latitude, longitude};
    })
    return locations.map(location => {
      const lat = location.latitude    
      const lng = location.longitude
      return {location: new google.maps.LatLng(lat, lng), weight: 1};
    })
  }
  
  loadHeatmap = (event) => { 
    let heatmapData = this.getCoordsFromPostcode(postcodesData)
      let heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });
      heatmap.setMap(this.map);
    };
  

  render() {
    const mapStyle = {
      width: 750,
      height: 550,
      border: '1px solid black'
    };
    
    return (
      <div>
      <div className='buttonRow'>
      <i title='heatmap' className="fa fa-map" onClick={this.loadHeatmap}></i>
      <i title='property type' className="fa fa-home" onClick={this.loadCrimeChart}></i>
      <i title='crime data' className="fa fa-balance-scale"></i>
      <i title='broadband speed' className="fa fa-wifi"></i>
      <i title='natural disaster risk' className="fa fa-bolt"></i>
      </div>

      <div className='actualMap' ref="map" style={mapStyle}></div>

      
      <div>
       <p>props and state provided by google maps event handlers</p>
       <p>current long:  {this.state.center.lat}</p>
       <p>current lat:  {this.state.center.lng}</p>
       <p>current zoom: {this.state.zoom}</p>
      </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Map />,
  document.getElementById('root')
);


export default Map;