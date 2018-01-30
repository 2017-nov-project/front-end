
const google = window.google;
const baseUrl = 'https://peaceful-waters-20110.herokuapp.com/api'

export const fetchAllCoordinates = () => {
return fetch (`https://peaceful-waters-20110.herokuapp.com/api/coordinates/postcodes`)
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
    return fetch (`https://peaceful-waters-20110.herokuapp.com/api/postcode/${userPostcode}/coordinates`)
    .then(res => res.json())
  } else {
    let userTown = props.userInput
    return fetch(`https://peaceful-waters-20110.herokuapp.com/api/town/${userTown}/coordinates`)
    .then(res => res.json())
    }
  }

  export const getAveragePriceByInput = (userInput, searchType) => {    

    searchType = searchType.toLowerCase()
    userInput = userInput.toUpperCase()

    return fetch(`${baseUrl}/${searchType}/${userInput}/average_price`)
    .then(res => res.json())
    .catch(console.log)
  }
  
