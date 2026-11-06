import * as api from '@lp-labs/base64url-text-codec';
import { encodeBase64Url } from '@lp-labs/base64url-text-codec';
console.log(encodeBase64Url('Hello, 世界'));
// @ts-expect-error invalid argument must be rejected by declarations
api.encodeBase64Url(1);
