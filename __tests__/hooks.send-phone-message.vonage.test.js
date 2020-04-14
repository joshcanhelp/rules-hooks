jest.mock('nexmo');

const { random } = require('faker');

const hook = require('../hooks/send-phone-message/send-sms-with-vonage');

let result;
const callback = (err, token) => {
  if (err) throw err;
  result = token;
};

let defaultContext;

describe('hook: send phone message, vonage', () => {

  beforeEach(() => {
    result = undefined;
    defaultContext = {
      webtask: {
        secrets: {
          VONAGE_API_KEY: random.word(),
          VONAGE_API_SECRET: random.word(),
          VONAGE_FROM_NUMBER: random.word(),
        }
      }
    };
  });

  it('should fail if no Vonage API key is set', () => {
    delete defaultContext.webtask.secrets.VONAGE_API_KEY;

    expect(() => {
      hook(random.word(), random.words(10), defaultContext, callback);
    }).toThrow('apiKey is required');
  });

  it('should fail if no Vonage API secret is set', () => {
    delete defaultContext.webtask.secrets.VONAGE_API_SECRET;

    expect(() => {
      hook(random.word(), random.words(10), defaultContext, callback);
    }).toThrow('apiSecret is required');
  });

  it('should fail if no Vonage from number is set', () => {
    delete defaultContext.webtask.secrets.VONAGE_FROM_NUMBER;

    expect(() => {
      hook(random.word(), random.words(10), defaultContext, callback);
    }).toThrow('fromNumber is required');
  });

  it('should fail if there no to number', () => {

    expect(() => {
      hook('', random.words(10), defaultContext, callback);
    }).toThrow('toNumber is required');
  });

  it('should fail if to number is not a number', () => {
    expect(() => {
      hook(random.words(), random.words(10), defaultContext, callback);
    }).toThrow('toNumber is required');
  });

  it('should fail if there no text content', () => {
    expect(() => {
      hook('123456789', '', defaultContext, callback);
    }).toThrow('text is required');
  });

  it('should throw an error if the message fails to send', () => {
    expect(() => {
      hook('123456789', '__test_failure__', defaultContext, callback);
    }).toThrow('Message failed: __test_failure__');
  });

  it('should complete successfully', () => {
    hook('123456789', '__test_success__', defaultContext, callback);
    expect(result).toEqual({});
  });
});