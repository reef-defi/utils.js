// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@reef-defi/util/types';

import { u8aToU8a } from '@reef-defi/util';
import js from 'js-sha3';

import { isReady, keccak256 } from '@polkadot/wasm-crypto';

/**
 * @name keccakAsU8a
 * @summary Creates a keccak Uint8Array from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsU8a } from '@reef-defi/util-crypto';
 *
 * keccakAsU8a('123'); // => Uint8Array
 * ```
 */
export function keccakAsU8a (value: HexString | Buffer | Uint8Array | string, bitLength: 256 | 512 = 256, onlyJs = false): Uint8Array {
  const is256 = bitLength === 256;

  return isReady() && is256 && !onlyJs
    ? keccak256(u8aToU8a(value))
    : new Uint8Array(
      (is256 ? js.keccak256 : js.keccak512).update(u8aToU8a(value)).arrayBuffer()
    );
}
