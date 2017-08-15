'use strict';

var jsRegex = /^javascript:.*/im;
var dataRegex = /^data:.*/im;
var ctrlCharactersRegex = /[^\x20-\x7E]/gmi;

function sanitizeUrl(url) {
  var sanitizedUrl = url.replace(ctrlCharactersRegex, '');

  return sanitizedUrl
    .replace(jsRegex, 'about:blank')
    .replace(dataRegex, 'about:blank');
}

module.exports = {
  sanitizeUrl: sanitizeUrl
};
