const { random } = require('faker');

const rule = require('../rules/check-email-from-csv');

let userFinal;
let contextFinal;
const callback = (err, user, context) => {
  if (err) throw err;
  userFinal = user;
  contextFinal = context;
};

describe('rule: check remote CSV for specific email', () => {

  beforeEach(() => {
    userFinal = undefined;
    contextFinal = undefined;
  });

  it('should throw an error when the user has no email', () => {
    expect(() => {
      rule({}, {}, callback);
    }).toThrow('Email is not on beta list.');
  });
});