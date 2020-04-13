const hook = require('../hooks/client-credentials-exchange/default-cce');

let result;
const callback = (err, token) => {
  if (err) throw err;
  result = token;
};

describe('hook: client credentials, default', () => {

  beforeEach(() => {
    result = undefined;
  });

  it('should return the scopes passed in', () => {
    hook({}, ['a:scope'], 'audience', {}, callback);
    expect(result).toEqual({scope:['a:scope']});
  });

  it('should not rely on any other parameter', () => {
    hook(undefined, ['another:scope'], undefined, undefined, callback);
    expect(result).toEqual({scope:['another:scope']});
  });
});