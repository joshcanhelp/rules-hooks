/* globals configuration */
module.exports = function rule(user, context, cb) {
  const errorMsg = 'Email is not on beta list.';

  if (!user.email) {
    return cb(errorMsg);
  }

  require('request@2.88.0').get(
    configuration.BETA_INVITE_CSV_URL,
    (errorHttp, response, body) => {

      if (errorHttp || 300 <= response.statusCode) {
        return cb(errorHttp || new Error('Error getting beta list.'));
      }

      require('csv@0.4.2').parse(body, (errorCsv, rows) => {

        if (errorCsv || !rows || !Array.isArray(rows)) {
          return cb(errorCsv || new Error('Error parsing beta list.'));
        }

        rows.shift();
        rows.forEach((row) => {
          if (user.email === row[1]) {
            return cb(null, user, context);
          }
        });

        return cb(errorMsg);
      });
    }
  );
};