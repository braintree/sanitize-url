# 5.0.0

- Sanitize vbscript urls (thanks @vicnicius)

# 4.1.1

- Fixup path to type declaration (closes #25)

# 4.1.0

- Add typescript types

# CHANGELOG

## 4.0.1

- Fix issue where urls with accented characters were incorrectly sanitized

## 4.0.0

_Breaking Changes_

- Protocol-less urls (ie: www.example.com) will be sanitised and passed on instead of sending out `about:blank` (Thanks @chawes13 #18)

## 3.1.0

- Trim whitespace from urls

## 3.0.0

_breaking changes_

- Replace blank strings with about:blank
- Replace null values with about:blank

## 2.1.0

- Allow relative urls to be sanitized

## 2.0.2

- Sanitize malicious URLs that begin with `\s`

## 2.0.1

- Sanitize malicious URLs that begin with %20

## 2.0.0

- sanitize data: urls

## 1.0.0

- sanitize javascript: urls
