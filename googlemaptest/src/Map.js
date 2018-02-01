import React from 'react';
import ReactDOM from 'react-dom';
import { fetchAllCoordinates, fetchCoordinatesByInput } from './api';
// import boundariesData from './data/boundaries.js'


const google = window.google;

class Map extends React.Component {

  state = {
    zoom: 16,
    isHeatmap: false,
    isBikemap: false,
    isTransmap: false,
    isDensitymap: false
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.props.coords,
      zoom: this.state.zoom
    })
  }

  componentWillUnmount() {
   google.maps.event.clearInstanceListeners(this.map)
}

  componentWillReceiveProps(newProps) {
    if(this.props.coords.lat !== newProps.coords.lat && this.props.coords.lng !== newProps.coords.lng) {
    const {coords} = newProps
    this.map = new google.maps.Map(this.refs.map, {
      center: coords,
      zoom: 12
    })
   }
  }

handleReRender = event => {
  this.map = new google.maps.Map(this.refs.map, {
    center: this.props.coords,
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
        data: heatmapData,
        radius: 12,
        opacity: 1
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

// loadBoundaryMap = (event) => {
//     this.map.data.addGeoJson(boundariesData);
//     this.map.data.setStyle({
//       strokeColor: "darkslategray",
//       fillColor: 'lightslategray',
//       fillOpacity: 0.1,
//       strokeWeight: 1
//     })
//   }

  render() {
    return (
      <div>
      <div className='buttonRowMap'>
      <i title='heatmap' className="fa fa-map hvr-grow" onClick={this.loadHeatmap}></i>
      <i title='cycle routes' className="fa fa-bicycle hvr-grow" onClick={this.loadBikeMap}></i>
      <i title='public transport' className="fa fa-subway hvr-grow" onClick={this.loadPublicTransportMap}></i>
      <i title='traffic density' className="fa fa-car hvr-grow" onClick={this.loadDensityMap}></i>
      <i title='county boundaries' className="fa fa-pencil-square-o hvr-grow" onClick={this.loadBoundaryMap}></i>
      </div>
      <div className='actualMap' ref="map"></div>
      <div>
      </div>
      </div>
    )
  }
}




export default Map;