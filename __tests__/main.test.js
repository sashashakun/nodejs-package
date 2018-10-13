import nock from 'nock';
import main, { weatherServiceApiUrl } from '../src/main';

describe('#main()', () => {
  beforeEach(() => {
    nock(weatherServiceApiUrl)
      .get(/search/)
      .reply(200, [{ woeid: 44418 }]);

    nock(weatherServiceApiUrl)
      .get(/44418/)
      .reply(200, { consolidated_weather: [{ weather_state_name: 'Showers' }] });
  });

  describe('when city data exists in the service', () => {
    it('returns weather', async () => {
      const data = await main('london');
      expect(data).toBe('Showers');
    });
  });
});
