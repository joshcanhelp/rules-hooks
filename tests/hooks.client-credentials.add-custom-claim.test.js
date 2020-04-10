const hook = require('../hooks/client-credentials-exchange/add-custom-claim');

let result;
const callback = (err, token) => {
  if (err) throw err;
  result = token;
};

describe('default hook', () => {

  beforeEach(() => {
    result = undefined;
  });

  it('should keep the scopes passed in', () => {
    hook({}, ['a:scope'], 'audience', {}, callback);
    expect(result).toHaveProperty('scope');
    expect(result.scope).toEqual(['a:scope']);
  });

  it('should set a default plan of "none" if client metadata is missing', () => {
    hook({}, ['a:scope'], undefined, undefined, callback);
    expect(result).toHaveProperty('https://custom-claim/plan');
    expect(result['https://custom-claim/plan']).toEqual('none');
  });

  it('should set a default plan of "none" if plan is missing', () => {
    hook({metadata:{}}, ['a:scope'], undefined, undefined, callback);
    expect(result).toHaveProperty('https://custom-claim/plan');
    expect(result['https://custom-claim/plan']).toEqual('none');
  });

  it('should set the plan from the client metadata', () => {
    hook({metadata:{plan: '__test_plan__'}}, ['a:scope'], undefined, undefined, callback);
    expect(result).toHaveProperty('https://custom-claim/plan');
    expect(result['https://custom-claim/plan']).toEqual('__test_plan__');
  });
});