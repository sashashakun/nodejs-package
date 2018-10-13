import main, { weatherServiceApiUrl } from '../src/main';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import nock from 'nock';

describe('#main()', () => {
  beforeEach(() => {
    nock(weatherServiceApiUrl)
      .get(/search/)
      .reply(200, [{ woeid: 44418 }])

    nock(weatherServiceApiUrl)
      .get(/44418/)
      .reply(200, { consolidated_weather: [{ weather_state_name: 'Showers' }] })
  });

  describe('when city data is exis in the service', () => {
    it('returns weather', () => {
      return main('london').then((data) => {
        expect(data).toBe('Showers')
      })
    })
  });  
});
