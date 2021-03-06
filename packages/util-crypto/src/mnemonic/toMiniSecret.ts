// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, stringToU8a } from '@reef-defi/util';

import { bip39ToMiniSecret, isReady } from '@polkadot/wasm-crypto';

import { pbkdf2Encode } from '../pbkdf2';
import { mnemonicToEntropy } from './toEntropy';
import { mnemonicValidate } from './validate';

export function mnemonicToMiniSecret (mnemonic: string, password = '', onlyJs = false): Uint8Array {
  assert(mnemonicValidate(mnemonic), 'Invalid bip39 mnemonic specified');

  if (isReady() && !onlyJs) {
    return bip39ToMiniSecret(mnemonic, password);
  }

  const entropy = mnemonicToEntropy(mnemonic);
  const salt = stringToU8a(`mnemonic${password}`);

  // return the first 32 bytes as the seed
  return pbkdf2Encode(entropy, salt).password.slice(0, 32);
}
