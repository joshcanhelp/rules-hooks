function Nexmo (credentials) {
  if (!credentials.apiKey) {
    throw new Error('apiKey is required');
  }

  if (!credentials.apiSecret) {
    throw new Error('apiSecret is required');
  }

  this.apiKey = credentials.apiKey;
  this.apiSecret = credentials.apiSecret;
  this.message = {
    sendSms: (fromNumber, toNumber, text, cb) => {
      if (!fromNumber) {
        cb(new Error('fromNumber is required'));
      }

      if (!toNumber) {
        cb(new Error('toNumber is required'));
      }

      if (!text) {
        cb(new Error('text is required'));
      }

      if ('__test_failure__' === text) {
        cb(null, {messages: [{
          status: '1',
          'error-text': text
        }]});
      }

      cb(null, {messages: [{status: '0'}]});
    }
  };
}

module.exports = Nexmo;