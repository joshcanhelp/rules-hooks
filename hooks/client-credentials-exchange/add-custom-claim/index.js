module.exports = function(client, scope, audience, context, cb) {
  const accessToken = {scope};
  const clientPlan = (client.metadata && client.metadata.plan) || 'none';
  accessToken['https://custom-claim/plan'] = clientPlan;
  cb(null, accessToken);
};