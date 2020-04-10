const { random } = require('faker');

const hook = require('../hooks/client-credentials-exchange/blocked-client-id');

let result;
const callback = (err, token) => {
  if (err) throw err;
  result = token;
};

describe('default hook', () => {

  beforeEach(() => {
    result = undefined;
  });

  it('should return the scopes passed in', () => {
    hook({}, ['a:scope'], 'audience', {}, callback);
    expect(result).toEqual({scope:['a:scope']});
  });

  it('should block Blocked Client', () => {
    const client = {
      id: 'ampPPpZN2tWSMzh6ldy7HiVjXpFMV66x',
      name: 'Blocked Client'
    };

    expect(() => {
      hook(client, ['another:scope'], undefined, undefined, callback);
    }).toThrow('Application Blocked Client is blocked.');
  });

  it('should not block arbitrary clients', () => {
    const client = {id: random.word() };
    hook(client, ['another:scope'], undefined, undefined, callback);

    expect(result).toEqual({scope:['another:scope']});
  });
});