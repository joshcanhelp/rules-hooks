/**
@param {object} user - The affected user
@param {string} user.id - user id
@param {string} user.username - user name
@param {string} user.email - email
@param {string} user.last_password_reset - exact date/time the user's password was changed
@param {object} context - Auth0 connection and other context info
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error)
*/
module.exports = function (user, context, cb) {
  // Perform any asynchronous actions, e.g. send notification to Slack.
  cb();
};