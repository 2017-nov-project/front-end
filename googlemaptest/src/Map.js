import React from 'react';
import ReactDOM from 'react-dom';
import housesData from './data/housesData.js'

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

    //this.getCoordsFromPostcode(housesData)

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


getCoordsFromPostcode = housesData => {
  const postcodeArray = housesData.map(element => element.postcode).slice(0,10)
  return Promise.all(postcodeArray.map(postcode => {
    return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': postcode}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results[0].geometry.location)
        } else {
          reject(new Error('error'));
        }
    })
  })
}))
.then(locations => {
  
return locations.map(location => {

    const lat = location.lat()    
    const lng = location.lng()
  
    return {location: new google.maps.LatLng(lat, lng), weight: 1};
    

  })
})
.catch(console.log)
}








loadHeatmap = (event) => {
  console.log({housesData});
  
  this.getCoordsFromPostcode(housesData).then(heatmapData => {

    console.log({heatmapData});
    

    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData
    });
    heatmap.setMap(this.map);

  });

//let heatmap;
 

// heatmap = new google.maps.visualization.HeatmapLayer({
//   data: heatmapData
// });
// heatmap.setMap(this.map);
}












  render() {
    const mapStyle = {
      width: 700,
      height: 500,
      border: '1px solid black'
    };
    
    return (
      <div>
      <div>
      <div className='buttonRow'>
      <i title='heatmap' className="fa fa-map" onClick={this.loadHeatmap}></i>
      <i title='property type' className="fa fa-home" onClick={this.loadCrimeChart}></i>
      <i title='crime data' className="fa fa-balance-scale"></i>
      <i title='broadband speed' className="fa fa-wifi"></i>
      <i title='natural disaster risk' className="fa fa-bolt"></i>
      </div>
        <div ref="map" style={mapStyle}></div>
      </div>
      <div>
       <p>props and state provided by google maps event handlers</p>
       <p>current long:  {this.state.center.lat}</p>
       <p>current lat:  {this.state.center.lng}</p>
       <p>current zoom: {this.state.zoom}</p>
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Map />,
  document.getElementById('root')
);


export default Map;