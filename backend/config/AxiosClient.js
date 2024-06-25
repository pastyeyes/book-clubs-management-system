const axios = require('axios');

class AxiosClient {
  constructor(apiKey = '') {
    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `key=${apiKey}` }), // If apiKey is true return the object and spread it
      },
    });
  }

  getClient() {
    return this.client;
  }
}

module.exports = AxiosClient;
