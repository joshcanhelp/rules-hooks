module.exports = function rule (user, context, callback) {
  const BLOCKED_USERS = [
    'josh@joshcanhelp.com'
  ];

  if (user.email && BLOCKED_USERS.indexOf(user.email) > -1) {
    callback(new Error('User is blocked.'));
  }

  callback(null, user, context);
};