module.exports = {
  get: (url, cb) => {
    switch(url) {
      case 'http_error':
        return cb(new Error('http_error'), {}, {});

      case 'not_found':
        return cb(null, {statusCode: 404}, {});

      case 'server_error':
        return cb(null, {statusCode: 500}, {});
    }

    const csvBody = '\n__name_1__,__email_1__\n__name_2__,__email_2__';
    return cb(null, {statusCode: 200}, csvBody);
  }
};