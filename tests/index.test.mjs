import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('encodes UTF-8 as url-safe text', () => {
  assert.equal(api.encodeBase64Url('foo?'), 'Zm9vPw');
});
test('round trips Unicode', () => {
  assert.equal(api.decodeBase64Url(api.encodeBase64Url('Hello, 世界')), 'Hello, 世界');
});
test('omits padding', () => {
  assert.equal(api.encodeBase64Url('f'), 'Zg');
});
test('decodes empty value', () => {
  assert.equal(api.decodeBase64Url(''), '');
});
test('accepts URL-safe symbols', () => {
  assert.equal(api.decodeBase64Url('4KC_'), '࠿');
});
test('rejects invalid alphabet', () => {
  assert.throws(() => api.decodeBase64Url('a+b'), RangeError);
});
