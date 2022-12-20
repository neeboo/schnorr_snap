import { MetamaskState, SnapConfig, Wallet } from '@astrox/schnorr-snap-types';
import deepmerge from 'deepmerge';

export const btcMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/0'/0'/0/0",
  network: 'mainnet',
  rpc: {
    token: '',
    url: 'https://ic0.app',
  },
  unit: {
    decimals: 8,
    image: `https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=023`,
    symbol: 'BTC',
  },
};

export const btcLocalConfiguration: SnapConfig = {
  derivationPath: "m/44'/0'/0'/0/0",
  network: 'local',
  rpc: {
    token: '',
    url: 'https://localhost:8000',
  },
  unit: {
    decimals: 8,
    image: `https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=023`,
    symbol: 'BTC',
  },
};

export const defaultConfiguration = btcMainnetConfiguration;

export function getDefaultConfiguration(networkName?: string): SnapConfig {
  switch (networkName) {
    case 'mainnet':
      console.log('BTC mainnet network selected');
      return btcMainnetConfiguration;
    case 'local':
      console.log('BTC local network selected');
      return btcLocalConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(wallet: Wallet): Promise<SnapConfig> {
  const state = (await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  })) as MetamaskState;
  if (!state || !state.schnorr.config) {
    return defaultConfiguration;
  }
  return state.schnorr.config;
}

export interface ConfigureResponse {
  snapConfig: SnapConfig;
}

export async function configure(wallet: Wallet, networkName: string, overrides?: unknown): Promise<ConfigureResponse> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = overrides ? deepmerge(defaultConfig, overrides) : defaultConfig;
  const [, , coinType, , ,] = configuration.derivationPath.split('/');
  const bip44Code = coinType.replace("'", '');
  //   // instatiate new api
  //   const api = await getApiFromConfig(configuration);
  //   const apiNetworkName = await api.stateNetworkName();
  // check if derivation path is valid
  if (bip44Code != '0') {
    throw new Error('Wrong CoinType in derivation path');
  }
  const state = (await wallet.request({ method: 'snap_manageState', params: ['get'] })) as MetamaskState;
  state.schnorr.config = configuration;
  wallet.request({
    method: 'snap_manageState',
    params: ['update', state],
  });
  return { snapConfig: configuration };
}
