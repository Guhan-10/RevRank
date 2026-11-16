const API_URL = 'https://api.example.com';

describe('carAPI', () => {
  let carAPI;

  beforeEach(() => {
    jest.resetModules();
    process.env.REACT_APP_API_URL = `${API_URL}/`;
    carAPI = require('./carAPI');
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ cars: [] }) }));
  });

  afterEach(() => {
    delete process.env.REACT_APP_API_URL;
    delete global.fetch;
  });

  test('calls the API URL from REACT_APP_API_URL, without a double slash', async () => {
    await carAPI.getCars();
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/cars`);
  });

  test('never falls back to a hard-coded localhost URL', async () => {
    await carAPI.getTopCars();
    expect(global.fetch.mock.calls[0][0]).not.toMatch(/127\.0\.0\.1|localhost/);
  });
});
