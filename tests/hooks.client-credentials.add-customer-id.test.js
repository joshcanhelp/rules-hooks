const hook = require('../hooks/client-credentials-exchange/add-customer-id');

let result;
const callback = (err, token) => {
  if (err) throw err;
  result = token;
};

describe('hook: client credentials, add customerID', () => {

  beforeEach(() => {
    result = undefined;
  });

  it('should keep the scopes passed in', () => {
    hook({}, ['a:scope'], 'audience', {}, callback);
    expect(result).toHaveProperty('scope');
    expect(result.scope).toEqual(['a:scope']);
  });

  it('should not set the customerID if metadata is not defined', () => {
    hook({}, ['another:scope'], undefined, undefined, callback);
    expect(result).not.toHaveProperty('https://custom-claim/customerID');
  });

  it('should not set the customerID if metadata does not include customerID', () => {
    hook({metadata: {something: []}}, ['another:scope'], undefined, undefined, callback);
    expect(result).not.toHaveProperty('https://custom-claim/customerID');
  });

  it('should set the customerID with the metadata customerID', () => {
    hook({metadata: {customerID: '__test_customer_id__'}}, ['another:scope'], undefined, undefined, callback);
    expect(result).toHaveProperty('https://custom-claim/customerID');
    expect(result).toEqual({
      'https://custom-claim/customerID' : '__test_customer_id__',
      'scope' : ['another:scope'],

    });
  });
});