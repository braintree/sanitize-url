import {
  BLANK_URL,
  ctrlCharactersRegex,
  htmlCtrlEntityRegex,
  htmlEntitiesRegex,
  invalidProtocolRegex,
  relativeFirstCharacters,
  urlSchemeRegex,
  whitespaceEscapeCharsRegex,
} from "./constants";

function isRelativeUrlWithoutProtocol(url: string): boolean {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

// adapted from https://stackoverflow.com/a/29824550/2601552
function decodeHtmlCharacters(str: string) {
  const removedNullByte = str.replace(ctrlCharactersRegex, "");
  return removedNullByte.replace(htmlEntitiesRegex, (match, dec) => {
    return String.fromCharCode(dec);
  });
}

function decodeURI(uri: string): string {
  try {
    return decodeURIComponent(uri);
  } catch (e: unknown) {
    // Ignoring error
    // It is possible that the URI contains a `%` not associated
    // with URI/URL-encoding.
    return uri;
  }
}

export function sanitizeUrl(url?: string): string {
  if (!url) {
    return BLANK_URL;
  }
  let charsToDecode;
  let decodedUrl = decodeURI(url);

  do {
    decodedUrl = decodeHtmlCharacters(decodedUrl)
      .replace(htmlCtrlEntityRegex, "")
      .replace(ctrlCharactersRegex, "")
      .replace(whitespaceEscapeCharsRegex, "")
      .trim();

    decodedUrl = decodeURI(decodedUrl);

    charsToDecode =
      decodedUrl.match(ctrlCharactersRegex) ||
      decodedUrl.match(htmlEntitiesRegex) ||
      decodedUrl.match(htmlCtrlEntityRegex) ||
      decodedUrl.match(whitespaceEscapeCharsRegex);
  } while (charsToDecode && charsToDecode.length > 0);
  const sanitizedUrl = decodedUrl;
  if (!sanitizedUrl) {
    return BLANK_URL;
  }

  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);

  if (!urlSchemeParseResults) {
    return sanitizedUrl;
  }

  const urlScheme = urlSchemeParseResults[0];

  if (invalidProtocolRegex.test(urlScheme)) {
    return BLANK_URL;
  }

  return sanitizedUrl;
}
