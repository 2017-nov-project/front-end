
const google = window.google;
const baseUrl = 'https://peaceful-waters-20110.herokuapp.com/api'

export const fetchAllCoordinates = () => {
  console.log('called')
return fetch (`${baseUrl}/coordinates/postcodes`)
.then(res => res.json())
.then(res => {
  console.log(res)
  return res.arr.map(location => {
    if (!location) return;
      const lat = location.latitude    
      const lng = location.longitude
      const weight = location.weight
   return {location: new google.maps.LatLng(lat, lng), weight: (weight)};
    })
  })
}

export const fetchCoordinatesByInput = (userInput) => {
  if (/\d/.test(userInput)) {
    return fetch (`${baseUrl}/postcode/${userInput}/coordinates`)
    .then(res => res.json())
  } else {
    return fetch(`${baseUrl}/town/${userInput}/coordinates`)
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