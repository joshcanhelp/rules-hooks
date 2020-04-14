const { random } = require('faker');

const rule = require('../rules/add-customer-id-to-at');

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

  it('should return the user unchanged if no app metadata is present', () => {
    const testUser = {name: random.word()};
    rule(testUser, {}, callback);
    expect(userFinal).toEqual(testUser);
    expect(contextFinal).toEqual({});
  });

  it('should return the user unchanged if no customerID field is present on app metadata', () => {
    const testUser = {
      name: random.word(),
      app_metadata: {}
    };
    rule(testUser, {}, callback);
    expect(userFinal).toEqual(testUser);
    expect(contextFinal).toEqual({});
  });

  it('should return the user unchanged if no customerID field is present on app metadata', () => {
    const testUser = {
      name: random.word(),
      app_metadata: {
        customerID: random.word()
      }
    };
    rule(testUser, {accessToken: {}}, callback);
    expect(userFinal).toEqual(testUser);
    expect(contextFinal).toEqual({
      accessToken: {
        'https://custom-claim/customerID' : testUser.app_metadata.customerID
      }
    });
  });

});