/* globals configuration, auth0 */
module.exports = function rule(user, context, cb) {

  if (!user.email) {
    return cb(null, user, context);
  }

  user.user_metadata = user.user_metadata || {};
  user.user_metadata.clearbit = user.user_metadata.clearbit || {
    profile: {},
    date: 0,
  };

  if (Date.now() - user.user_metadata.clearbit.date < 604800) {
    return cb(null, user, context);
  }

  const clearbit = require('clearbit')(configuration.CLEARBIT_SECRET_API_KEY);
  clearbit.Enrichment.find({email: user.email, stream: true}).then((person) => {

    user.user_metadata.clearbit.profile = person;
    user.user_metadata.clearbit.date = Date.now();
    auth0.users.updateUserMetadata(user.user_id, user.user_metadata).then(() => {

      return cb(null, user, context);
    }).catch((err) => cb(err, user, context));
  }).catch((err) => cb(err, user, context));
};