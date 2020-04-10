module.exports = function(client, scope, audience, context, cb) {
  const BLOCKED_CLIENTS = ['ampPPpZN2tWSMzh6ldy7HiVjXpFMV66x'];

  if (BLOCKED_CLIENTS.indexOf(client.id) > -1) {
    cb(new Error(`Application ${client.name} is blocked.`));
  }

  cb(null, {scope});
};
