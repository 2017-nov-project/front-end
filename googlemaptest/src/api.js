
const google = window.google;

export const fetchAllCoordinates = () => {
return fetch (`http://localhost:4000/api/coordinates/postcodes`)
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

  export const fetchCoordinatesByInput = (userInput) => {
    if(!userInput) return;
    if (userInput.userInput.match(/.\d/)) {
    let userPostcode = userInput.userInput
    return fetch (`http://localhost:4000/api/postcode/${userPostcode}/coordinates`)
    .then(res => res.json())
  } else {
    let userTown = userInput.userInput
    return fetch(`http://localhost:4000/api/town/${userTown}/coordinates`)
    .then(res => res.json())
    .catch(res => console.log('err'))
    }
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
  
