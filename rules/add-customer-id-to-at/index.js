module.exports = function rule(user, context, cb) {
  if (user.app_metadata && user.app_metadata.customerID) {
    context.accessToken['https://custom-claim/customerID'] = user.app_metadata.customerID;
  }
  return cb(null, user, context);
};