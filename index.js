'use strict';

var jsRegex = /^(%20)*javascript:.*/im;
var dataRegex = /^(%20)*data:.*/im;
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
