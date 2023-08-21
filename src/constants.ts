export const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
export const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
export const htmlCtrlEntityRegex = /&(newline|tab);/gi;
export const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
export const urlSchemeRegex = /^.+(:|&colon;)/gim;
export const relativeFirstCharacters = [".", "/"];
export const BLANK_URL = "about:blank";
