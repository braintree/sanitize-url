'use strict';

var expect = require('chai').expect;
var sanitizeUrl = require('../').sanitizeUrl;

describe('sanitizeUrl', function () {
  it('allows normal URLs through', function () {
    expect(sanitizeUrl('http://example.com')).to.equal('http://example.com');
    expect(sanitizeUrl('https://example.com')).to.equal('https://example.com');
    expect(sanitizeUrl('https://example.com/with/path')).to.equal('https://example.com/with/path');
    expect(sanitizeUrl('hTTPs://example.com')).to.equal('hTTPs://example.com');
    expect(sanitizeUrl('HTTPS://EXAMPLE.COM')).to.equal('HTTPS://EXAMPLE.COM');
  });

  it('replaces empty URLs with about:blank', function () {
    expect(sanitizeUrl('')).to.equal('about:blank');
    expect(sanitizeUrl(' ')).to.equal('about:blank');
  });

  it('replaces protocol-only URLs with about:blank', function () {
    expect(sanitizeUrl('http://')).to.equal('about:blank');
    expect(sanitizeUrl('https://')).to.equal('about:blank');
  });

  it('replaces TLD-only URLs with about:blank', function () {
    expect(sanitizeUrl('http://.com')).to.equal('about:blank');
  });

  it('replaces URLs with preceding whitespace with about:blank', function () {
    expect(sanitizeUrl(' https://example.com')).to.equal('about:blank');
    expect(sanitizeUrl('  https://example.com')).to.equal('about:blank');
  });

  it('replaces URLs with non-HTTP protocols with about:blank', function () {
    expect(sanitizeUrl('file://example.com')).to.equal('about:blank');
    expect(sanitizeUrl('file:///path/to/file')).to.equal('about:blank');
    expect(sanitizeUrl('ftp://example.com')).to.equal('about:blank');
    expect(sanitizeUrl('httpnope://example.com')).to.equal('about:blank');
    expect(sanitizeUrl('javascript:alert(document.domain)')).to.equal('about:blank');
    expect(sanitizeUrl('jAvasCrIPT:alert(document.domain)')).to.equal('about:blank');
    expect(sanitizeUrl('javascript://example.com')).to.equal('about:blank');
  });

  it('ignores control characters in JavaScript urls', function () {
    expect(sanitizeUrl(decodeURIComponent('JaVaScRiP%0at:alert(document.domain)'))).to.equal('about:blank');
  });
});
