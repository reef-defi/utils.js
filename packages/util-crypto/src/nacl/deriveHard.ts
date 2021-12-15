// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, compactAddLength, isU8a, stringToU8a, u8aConcat } from '@reef-defi/util';

import { blake2AsU8a } from '../blake2/asU8a';

const HDKD = compactAddLength(stringToU8a('Ed25519HDKD'));

export function naclDeriveHard (seed: Uint8Array, chainCode: Uint8Array): Uint8Array {
  assert(isU8a(chainCode) && chainCode.length === 32, 'Invalid chainCode passed to derive');

  return blake2AsU8a(
    u8aConcat(HDKD, seed, chainCode)
  );
}
