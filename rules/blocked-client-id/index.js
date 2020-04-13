module.exports = function rule(user, context, cb) {
  const BLOCKED_CLIENTS = ['ampPPpZN2tWSMzh6ldy7HiVjXpFMV66x'];

  if (BLOCKED_CLIENTS.indexOf(context.clientID) > -1) {
    cb(new Error(`Application ${context.clientName} is blocked.`));
  }

  return cb(null, user, context);
}
