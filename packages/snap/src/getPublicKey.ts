import { Wallet } from '@astrox/schnorr-snap-types';
import { getIdentity } from './getIdentity';
import { SchorrIdentity, toHexString } from './util';

export async function getRawPublicKey(wallet: Wallet): Promise<string> {
  const identityString = await getIdentity(wallet);
  const identity = SchorrIdentity.fromJSON(identityString);
  const rawPublicKey = await identity.getPublicKey().toRaw();
  return toHexString(rawPublicKey);
}
