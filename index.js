'use strict';

var notVisibleAsciiRegex = /[^\x20-\x7E]/gmi;
var safeRegex = /^https?:\/\/[^\/\.]+/i;

function sanitizeUrl(url) {
  var sanitizedUrl = url.replace(notVisibleAsciiRegex, '');

  if (safeRegex.test(sanitizedUrl)) {
    return url;
  } else {
    return 'about:blank';
  }
}

module.exports = {
  sanitizeUrl: sanitizeUrl
};
