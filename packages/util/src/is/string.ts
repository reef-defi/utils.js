// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isString
 * @summary Tests for a string.
 * @description
 * Checks to see if the input value is a JavaScript string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isString } from '@reef-defi/util';
 *
 * console.log('isString', isString('test')); // => true
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isString (value: unknown): value is string | String {
  return typeof value === 'string' || value instanceof String;
}
