module.exports = function (user, context, callback) {
  const PROTECTED_CLIENTS = ['2RK41km2jWKh5BZx47z3KzbU1D6TqhNu'];

  if (PROTECTED_CLIENTS.indexOf(context.clientID) === -1) {
    return callback(null, user, context);
  }

  if (user.app_metadata && user.app_metadata.verified) {
    return callback(null, user, context);
  }

  return callback(new Error('Verification incomplete.'));
};
