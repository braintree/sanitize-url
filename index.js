'use strict';

var invalidPrototcolRegex = /^(%20|\s)*(javascript|data)/im;
var ctrlCharactersRegex = /[^\x20-\x7EÀ-ž]/gmi;
var urlSchemeRegex = /^([^:]+):/gm;
var relativeFirstCharacters = ['.', '/'];

function isRelativeUrlWithoutProtocol(url) {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

function sanitizeUrl(url) {
  var urlScheme, urlSchemeParseResults, sanitizedUrl;

  if (!url) {
    return 'about:blank';
  }

  sanitizedUrl = url.replace(ctrlCharactersRegex, '').trim();

  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);

  if (!urlSchemeParseResults) {
    return sanitizedUrl;
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
