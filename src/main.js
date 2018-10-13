import axios from 'axios';

export const weatherServiceApiUrl = 'https://www.metaweather.com/api/location';

export default async (city = 'moscow') => {
  try {
    const { data: locationData } = await axios.get(`${weatherServiceApiUrl}/search/?query=${city}`);
    if (locationData[0].woeid) {
      const { data: weatherData } = await axios.get(`${weatherServiceApiUrl}/${locationData[0].woeid}/`);

      return weatherData && weatherData.consolidated_weather && weatherData.consolidated_weather[0].weather_state_name;
    }

    console.log('No such city in our service, sorry. Try again!');
  } catch (e) {
    console.log(e);
  }
};
