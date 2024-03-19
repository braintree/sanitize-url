var btsu = (function() {
    const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
    const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
    const htmlCtrlEntityRegex = /&(newline|tab);/gi;
    const ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
    const urlSchemeRegex = /^.+(:|&colon;)/gim;
    const relativeFirstCharacters = [".", "/"];
    var publicAPIs = {};

    /**
     * Checks to see if a URL is a relative URL without a protocol.
     * 
     * @param {string} url The URL to check.
     * 
     * @returns {boolean} Returns true if the URL is a relative URL without a protocol.
     */
    function isRelativeUrlWithoutProtocol(url) {
        return relativeFirstCharacters.indexOf(url[0]) > -1;
    }

    /**
     * Decodes HTML entities in a string.
     * 
     * @param {string} str The string to decode HTML entities in.
     * @returns {string} The decoded string.
     */
    function decodeHtmlCharacters(str) {
        // adapted from https://stackoverflow.com/a/29824550/2601552
        return str.replace(htmlEntitiesRegex, (match, dec) => {
            return String.fromCharCode(dec);
        });
    }

    /**
     * Sanitizes a URL by removing control characters and invalid protocols.
     * 
     * @param {string} url The URL to sanitize.
     * 
     * @returns {string} The sanitized URL.
     */
    publicAPIs.sanitizeUrl = function(url) {
        const sanitizedUrl = decodeHtmlCharacters(url || "")
            .replace(htmlCtrlEntityRegex, "")
            .replace(ctrlCharactersRegex, "")
            .trim();
        if (!sanitizedUrl) {
            return "about:blank";
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
            return "about:blank";
        }
        return sanitizedUrl;
    }

    // Return our public method(s) so they can be accessed
    return publicAPIs;
})();
