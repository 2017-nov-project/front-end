import React from 'react';
import ReactDOM from 'react-dom';
import {fetchAllCoordinates, fetchCoordinatesByInput} from './api';

const google = window.google;

class Map extends React.Component {

  state = {
    center: {
      lat:  53.486051,
      lng: -2.239902
    },
    zoom: 16,
    isHeatmap: false,
    isBikemap: false,
    isTransmap: false,
    isDensitymap: false
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

  componentWillUnmount() {
   google.maps.event.clearInstanceListeners(this.map)
}

  componentWillReceiveProps(userInput) {
    fetchCoordinatesByInput(userInput)
    .then (res => {
    let center = {...this.state.center}
    center.lat = res.coordinates.latitude
    center.lng = res.coordinates.longitude
    this.setState({center, zoom: 12})
    })
    .then (res => {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.state.center,
      zoom: this.state.zoom
    })
    this.map.addListener('zoom_changed', () => {
      this.handleZoom()
    });
    this.map.addListener('center_changed', () => {
       this.handleCenter()
    });
  })
}
  
  handleZoom = event => {
      this.setState({
        zoom: this.map.getZoom(),
      });
    }

  handleCenter = event => {
    let newMap = this.map.getCenter()
    let center = {...this.state.center}
    center.lat = newMap.lat()
    center.lng = newMap.lng()
    this.setState({center})
}

handleReRender = event => {
  this.map = new google.maps.Map(this.refs.map, {
    center: this.state.center,
    zoom: this.state.zoom
  }) 
}
  
  loadHeatmap = (event) => {
    let heatmap = new google.maps.visualization.HeatmapLayer();
    if (this.state.isHeatmap) {
       this.setState({isHeatmap: false})
       heatmap.setMap(null)
       this.handleReRender()
    } else {
      fetchAllCoordinates()
      .then(heatmapData => {
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      })
      heatmap.setMap(this.map)
      this.setState({isHeatmap: true})
      })
    }
  }

loadBikeMap = (event) => {
  let bikemap = new google.maps.BicyclingLayer();
  if (this.state.isBikemap) {
     this.setState({isBikemap: false})
     bikemap.setMap(null)
     this.handleReRender()
  } else {
    bikemap.setMap(this.map)
    this.setState({isBikemap: true})
  }
}

loadPublicTransportMap = (event) => { 
  let transitLayer = new google.maps.TransitLayer();
  if (this.state.isTransmap) {
    this.setState({isTransmap: false})
    transitLayer.setMap(null)
    this.handleReRender()
  } else {
    transitLayer.setMap(this.map)
    this.setState({isTransmap: true})
  }
}

loadDensityMap = (event) => {
  let trafficLayer = new google.maps.TrafficLayer();
  if (this.state.isDensitymap) {
    this.setState({isDensitymap: false})
    trafficLayer.setMap(null)
    this.handleReRender()
  } else {
    trafficLayer.setMap(this.map)
    this.setState({isDensitymap: true})
  }
}


  render() {
    const mapStyle = {
      width: 900,
      height: 600,
      border: '1px solid gray'
    };
    
    return (
      <div>
      <div className='buttonRowMap'>
      <i title='heatmap' className="fa fa-map hvr-grow" onClick={this.loadHeatmap}></i>
      <i title='cycle routes' className="fa fa-bicycle hvr-grow" onClick={this.loadBikeMap}></i>
      <i title='public transport' className="fa fa-subway hvr-grow" onClick={this.loadPublicTransportMap}></i>
      <i title='traffic density' className="fa fa-car hvr-grow" onClick={this.loadDensityMap}></i>
      <i title='natural disaster risk' className="fa fa-bolt hvr-grow" onClick={this.removeHeatMap}></i>
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