// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { stringToU8a } from '@reef-defi/util';

import { blake2AsU8a } from '../../blake2/asU8a';
import { naclKeypairFromSeed } from './fromSeed';

/**
 * @name naclKeypairFromString
 * @summary Creates a new public/secret keypair from a string.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied string. The string is hashed and the value used as the input seed.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclKeypairFromString } from '@reef-defi/util-crypto';
 *
 * naclKeypairFromString('test'); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function naclKeypairFromString (value: string): Keypair {
  return naclKeypairFromSeed(
    blake2AsU8a(
      stringToU8a(value),
      256
    )
  );
}
