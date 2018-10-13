import axios from 'axios';

export const weatherServiceApiUrl = 'https://www.metaweather.com/api/location';

export default (city = 'london') => {

  return axios
    .get(`${weatherServiceApiUrl}/search/?query=${city}`)
    .then(({ data: locationData }) => {
      if (locationData[0].woeid) {
        return axios
          .get(`${weatherServiceApiUrl}/${locationData[0].woeid}/`)
          .then(({ data: weatherData }) => {
            return weatherData && weatherData.consolidated_weather && weatherData.consolidated_weather[0].weather_state_name;
          })
          .catch((e) => console.log(e));
      } else {
        console.log('No such city in our service, sorry. Try again!')
      }
    })
    .catch((e) => console.log(e));
};
