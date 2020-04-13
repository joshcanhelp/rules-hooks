module.exports = function(client, scope, audience, context, cb) {
  const accessToken = {scope};
  if (client.metadata && client.metadata.customerID) {
    accessToken['https://custom-claim/customerID'] = client.metadata.customerID;
  }
  cb(null, accessToken);
};