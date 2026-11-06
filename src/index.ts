export function encodeBase64Url(text: string): string {
  if (typeof text !== 'string') throw new TypeError('Expected text');
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
export function decodeBase64Url(encoded: string): string {
  if (typeof encoded !== 'string') throw new TypeError('Expected encoded text');
  if (!/^[A-Za-z0-9_-]*$/.test(encoded) || encoded.length % 4 === 1)
    throw new RangeError('Invalid base64url text');
  const standard = encoded.replace(/-/g, '+').replace(/_/g, '/');
  let binary: string;
  try {
    binary = atob(standard + '='.repeat((4 - (standard.length % 4)) % 4));
  } catch {
    throw new RangeError('Invalid base64url text');
  }
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new RangeError('Invalid UTF-8 payload');
  }
}
