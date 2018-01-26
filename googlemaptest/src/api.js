
const google = window.google;

export const fetchAllCoordinates = () => {
return fetch (`http://localhost:4000/api/coordinates`)
.then(res => res.json())
.then(res => {
  return res.coordinatesArr.map(location => {
    if (!location) return;
      const lat = location.latitude    
      const lng = location.longitude
   return {location: new google.maps.LatLng(lat, lng), weight: 1};
    })
  })
}

  export const fetchCoordinatesByPostcode = (userInput) => {
    let userPostcode = userInput.userInput
    return fetch (`http://localhost:4000/api/postcode/${userPostcode}/coordinates`)
    .then(res => res.json())
  }

  export const fetchCenter = event => {
      let newMap = this.map.getCenter()
      let center = {...this.state.center}
      center.lat = newMap.lat()
      center.lng = newMap.lng()
      return ({center})
  }

  export const getAveragePriceByInput = input => {
    if (input.match(/.\d/)) {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/postcode/${input}/average_price`)
    .then(res => res.json())
    } else {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/town/${input}/average_price`)
    .then(res => res.json())
    }
  }
  
