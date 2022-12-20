import { Wallet } from '@astrox/schnorr-snap-types';
import { getIdentity } from './getIdentity';
import { SchorrIdentity } from './util';

export async function getPrincipal(wallet: Wallet): Promise<string> {
  const identityString = await getIdentity(wallet);
  const identity = SchorrIdentity.fromJSON(identityString);
  const principal = await identity.getPrincipal().toText();
  return principal;
}
