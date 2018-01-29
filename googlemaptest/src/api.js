
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

  export const fetchCoordinatesByInput = (props) => {
    if(!props) return;
    if (props.searchType === 'POSTCODE') {
    let userPostcode = props.userInput
    return fetch (`http://localhost:4000/api/postcode/${userPostcode}/coordinates`)
    .then(res => res.json())
  } else {
    let userTown = props.userInput
    return fetch(`http://localhost:4000/api/town/${userTown}/coordinates`)
    .then(res => res.json())
    .catch(res => console.log('err'))
    }
  }

  export const getAveragePriceByInput = (userInput, searchType) => {
    if (searchType === 'POSTCODE') {
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/postcode/${userInput}/average_price`)
    .then(res => res.json())
    } else if (searchType === 'TOWN') {
      return fetch(`https://peaceful-waters-20110.herokuapp.com/api/town/${userInput}/average_price`)
      .then(res => res.json())
    } else if (searchType === 'COUNTY') {
      return fetch(`https://peaceful-waters-20110.herokuapp.com/api/county/${userInput}/average_price`)
      .then(res => res.json())
    } else if (searchType === 'LOCALITY') {
      return fetch(`https://peaceful-waters-20110.herokuapp.com/api/locality/${userInput}/average_price`)
      .then(res => res.json())
    }
  }
  
