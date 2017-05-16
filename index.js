// fetch http://www.ndbc.noaa.gov/data/realtime2/WPOW1.txt
// using Aerobatic CORS/HTTP Proxy endpoint set up in aerobatic.yml
// split 3rd line by space
fetch('https://seattletide.aerobatic.io/wpow1', {
  mode: 'cors'
}).then(function(res) {
  return res.text()
}).then(function(conditions) {
  //process the lines of the text file
  const conditionsLines = conditions.split('\n')
  const currentConditions = conditionsLines[2]
  //process the columns of the line of text
  const currentConditionsArray = currentConditions.split(' ')
  window.res = currentConditionsArray
  const direction = currentConditionsArray[5]
  // speed and gust are provided in meters per second
  // multiply by 2.236936 to get miles per hour (or round up)
  const convertMetersPerSecondToMilesPerHour = 2.24
  const speed = currentConditionsArray[7] * convertMetersPerSecondToMilesPerHour
  const gust = currentConditionsArray[9] * convertMetersPerSecondToMilesPerHour
  const barometer = currentConditionsArray[24]
  // temp is provided in degrees Celcius
  const convertCtoF = function convert(c) { return ( c * (9/5) ) + 32 }
  const temp = convertCtoF(currentConditionsArray[26])
  const round = function round(x) {
    return Math.round(x * 100) / 100
  }
  // update the html elements
  document.getElementById('direction').innerText = direction
  document.getElementById('speed').innerText = round(speed)
  document.getElementById('gust').innerText = round(gust)
  document.getElementById('temp').innerText = round(temp)
})