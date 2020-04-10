module.exports = function(toNumber, text, context, cb) {
  const Nexmo = require('nexmo');
  const nexmo = new Nexmo({
    apiKey: context.webtask.secrets.VONAGE_API_KEY,
    apiSecret: context.webtask.secrets.VONAGE_API_SECRET,
  });

  const fromNumber = context.webtask.secrets.VONAGE_FROM_NUMBER;
  toNumber = toNumber.replace(/\D/g, '');

  nexmo.message.sendSms(fromNumber, toNumber, text, (err, responseData) => {
    if (err) {
      return cb(err);
    }

    const firstMsg = responseData.messages[0];
    if (firstMsg['status'] !== '0') {
      return cb(new Error(`Message failed: ${firstMsg['error-text']}`));
    }

    cb();
  });
};
