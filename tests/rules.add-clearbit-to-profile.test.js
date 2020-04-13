const { random } = require('faker');

const rule = require('../rules/add-clearbit-to-user-meta');

let userFinal;
let contextFinal;
const callback = (err, user, context) => {
  if (err) throw err;
  userFinal = user;
  contextFinal = context;
};

describe('rule: add Clearbit profile to User meta', () => {

  beforeEach(() => {
    userFinal = undefined;
    contextFinal = undefined;
  });

  it('should return the user unchanged if no email is present', () => {
    rule({name: 'Anna'}, {}, callback);
    expect(userFinal).toEqual({name: 'Anna'});
    expect(contextFinal).toEqual({});
  });

  it('should return the profile unchanged if it has not been a week since the last sync', () => {
    const testUser = {
      email: random.word(),
      user_metadata: {
        clearbit: {
          profile: {},
          date: (Date.now() - 1000)
        }
      }
    };
    rule(testUser, {}, callback);
    expect(userFinal).toEqual(testUser);
    expect(contextFinal).toEqual({});
  });
});