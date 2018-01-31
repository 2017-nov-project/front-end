
const google = window.google;
const baseUrl = 'https://peaceful-waters-20110.herokuapp.com/api'

export const fetchAllCoordinates = () => {
return fetch (`${baseUrl}/coordinates/postcodes`)
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
  if (/\d/.test(userInput)) {
    let userPostcode = userInput
    return fetch (`${baseUrl}/postcode/${userPostcode}/coordinates`)
    .then(res => res.json())
  } else {
    let userTown = userInput
    return fetch(`${baseUrl}/town/${userTown}/coordinates`)
    .then(res => res.json())
  }
}

const getAveragePrice = (userInput, searchType) => { 
    searchType = searchType.toLowerCase()
    userInput = userInput.toUpperCase()
    return fetch(`${baseUrl}/${searchType}/${userInput}/average_price`)
    .then(res => res.json())
    .catch(console.log)
  }

export const searchForAvgPriceOnUserInput = async (userInput) => {
  let searchType
  if (/\d/.test(userInput)) {
    searchType = 'postcode'
  } else {
    const types = await Promise.all(['town', 'locality'].map(async (searchType) => {
      const results = await fetch(`${baseUrl}/${searchType}/${userInput}`)
      .then(buffer => buffer.json())
      return [searchType, Boolean(results.result.length)]
    }))
    searchType = types.find(([searchType, isTrue]) => isTrue ? searchType : false)[0]
  }
  return getAveragePrice(userInput, searchType)
}