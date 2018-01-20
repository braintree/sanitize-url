'use strict';

var invalidPrototcolRegex = /^(%20|\s)*(javascript|data)/im;
var ctrlCharactersRegex = /[^\x20-\x7E]/gmi;
var urlSchemeRegex = /^([^:]+):/gm;
var relativeFirstCharacters = ['.', '/']

function sanitizeUrl(url) {
  var urlScheme;
  var sanitizedUrl = url.replace(ctrlCharactersRegex, '');
  var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex) || [];

  if (!urlSchemeParseResults.length && relativeFirstCharacters.indexOf(url[0]) === -1) {
    return 'about:blank';
  }

  urlScheme = urlSchemeParseResults[0];

  if (invalidPrototcolRegex.test(urlScheme)) {
    return 'about:blank';
  }

  return sanitizedUrl;
}

module.exports = {
  sanitizeUrl: sanitizeUrl
};
