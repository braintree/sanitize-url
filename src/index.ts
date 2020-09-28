const invalidProtocolRegex = /^(%20|\s)*(javascript|data|vbscript)/im;
const ctrlCharactersRegex = /[^\x20-\x7EÀ-ž]/gim;
const urlSchemeRegex = /^([^:]+):/gm;
const relativeFirstCharacters = [".", "/"];

function isRelativeUrlWithoutProtocol(url: string): boolean {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

export function sanitizeUrl(url?: string): string {
  if (!url) {
    return "about:blank";
  }

  const sanitizedUrl = url.replace(ctrlCharactersRegex, "").trim();

  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);

  if (!urlSchemeParseResults) {
    return sanitizedUrl;
  }

  const urlScheme = urlSchemeParseResults[0];

  if (invalidProtocolRegex.test(urlScheme)) {
    return "about:blank";
  }

  return sanitizedUrl;
}
