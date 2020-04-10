function rule(user, context, callback) {
  const clientPlan = (context && context.clientMetadata && context.clientMetadata.plan) || 'none';
  context.accessToken['https://custom-claim/plan'] = clientPlan;
  return callback(null, user, context);
}