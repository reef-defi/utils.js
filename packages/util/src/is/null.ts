// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isNull
 * @summary Tests for a `null` values.
 * @description
 * Checks to see if the input value is `null`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isNull } from '@reef-defi/util';
 *
 * console.log('isNull', isNull(null)); // => true
 * ```
 */
export function isNull (value?: unknown): value is null {
  return value === null;
}
