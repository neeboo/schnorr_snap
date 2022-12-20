import { MetamaskSchnorrRpcRequest, MetamaskState, Wallet } from '@astrox/schnorr-snap-types';
import { configure, defaultConfiguration } from './config';
import { getIdentity } from './getIdentity';
import { getPrincipal } from './getPrincipal';
import { getRawPublicKey } from './getPublicKey';
import { sign, signRawMessasge } from './sign';

declare let wallet: Wallet;

export const EmptyMetamaskState: () => MetamaskState = () => ({
  schnorr: { config: defaultConfiguration, messages: [] },
});

export const onRpcRequest = async ({ origin, request }: { origin: string; request: MetamaskSchnorrRpcRequest }) => {
  const state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!state) {
    // initialize state if empty and set default config
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', EmptyMetamaskState()],
    });
  }

  switch (request.method) {
    case 'Schnorr_configure':
      const resp = await configure(wallet, request.params.configuration.network, request.params.configuration);
      return resp.snapConfig;
    case 'Schnorr_getIdentity':
      return await getIdentity(wallet);
    case 'Schnorr_getPrincipal':
      return await getPrincipal(wallet);
    case 'Schnorr_getRawPublicKey':
      return await getRawPublicKey(wallet);
    case 'Schnorr_sign':
      return await sign(wallet, request.params.message);
    case 'Schnorr_signRawMessage':
      return await signRawMessasge(wallet, request.params.message);

    default:
      throw new Error('Unsupported RPC method');
  }
};
