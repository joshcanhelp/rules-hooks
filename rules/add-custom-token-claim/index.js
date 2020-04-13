module.exports = function rule(user, context, cb) {
  const clientPlan = (context && context.clientMetadata && context.clientMetadata.plan) || 'none';
  context.accessToken['https://custom-claim/plan'] = clientPlan;
  return cb(null, user, context);
};