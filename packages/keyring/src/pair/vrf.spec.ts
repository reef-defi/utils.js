// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair } from '../types';

import { u8aToHex } from '@reef-defi/util';
import { cryptoWaitReady, encodeAddress as toSS58, naclKeypairFromSeed, randomAsU8a, schnorrkelKeypairFromSeed, secp256k1KeypairFromSeed } from '@reef-defi/util-crypto';

import { createPair } from '.';

const MESSAGE = 'this is a test message';
const CONTEXT = 'some context';

describe('vrf', (): void => {
  let ecdsa: KeyringPair;
  let ed25519: KeyringPair;
  let sr25519: KeyringPair;

  beforeAll(async (): Promise<void> => {
    await cryptoWaitReady();

    ecdsa = createPair({ toSS58, type: 'ecdsa' }, secp256k1KeypairFromSeed(randomAsU8a()));
    ed25519 = createPair({ toSS58, type: 'ed25519' }, naclKeypairFromSeed(randomAsU8a()));
    sr25519 = createPair({ toSS58, type: 'sr25519' }, schnorrkelKeypairFromSeed(randomAsU8a()));
  });

  it('has deterministic signature values for ecdsa', (): void => {
    const sig1 = ecdsa.vrfSign(MESSAGE, CONTEXT);
    const sig2 = ecdsa.vrfSign(MESSAGE, CONTEXT);

    expect(u8aToHex(sig1)).toEqual(u8aToHex(sig2));
    expect(ecdsa.vrfVerify(MESSAGE, sig1, ecdsa.publicKey, CONTEXT)).toEqual(true);
    expect(ecdsa.vrfVerify(MESSAGE, sig2, ecdsa.publicKey, CONTEXT)).toEqual(true);
  });

  it('has deterministic signature values for ed25519', (): void => {
    const sig1 = ed25519.vrfSign(MESSAGE, CONTEXT);
    const sig2 = ed25519.vrfSign(MESSAGE, CONTEXT);

    expect(u8aToHex(sig1)).toEqual(u8aToHex(sig2));
    expect(ed25519.vrfVerify(MESSAGE, sig1, ed25519.publicKey, CONTEXT)).toEqual(true);
    expect(ed25519.vrfVerify(MESSAGE, sig2, ed25519.publicKey, CONTEXT)).toEqual(true);
  });

  it('has deterministic signature values for sr25519', (): void => {
    const sig1 = sr25519.vrfSign(MESSAGE, CONTEXT);
    const sig2 = sr25519.vrfSign(MESSAGE, CONTEXT);

    expect(u8aToHex(sig1.slice(0, 32))).toEqual(u8aToHex(sig2.slice(0, 32)));
    expect(sr25519.vrfVerify(MESSAGE, sig1, sr25519.publicKey, CONTEXT)).toEqual(true);
    expect(sr25519.vrfVerify(MESSAGE, sig2, sr25519.publicKey, CONTEXT)).toEqual(true);
  });
});
