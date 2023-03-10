import { MetamaskSchnorrRpcRequest } from './methods';
import { EncryptMessageResponse, SignMessageResponse, SignRawMessageResponse } from './wallet';

export type SchnorrNetwork = 'mainnet' | 'local' | 'nostr';
export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}
export interface SnapConfig {
  derivationPath: string;
  coinType: number;
  network: SchnorrNetwork;
  rpc: {
    token: string;
    url: string;
  };
  unit?: UnitConfiguration;
}

export interface WalletEnableRequest {
  method: 'wallet_enable';
  params: object[];
}

export interface GetSnapsRequest {
  method: 'wallet_getSnaps';
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskSchnorrRpcRequest];
}

export type MetamaskRpcRequest = WalletEnableRequest | GetSnapsRequest | SnapRpcMethodRequest;

export interface SchnorrSnapApi {
  getRawPublicKey(): Promise<string>;
  configure(configuration: Partial<SnapConfig>): Promise<void>;
  sign(message: string): Promise<SignMessageResponse>;
  signRawMessage(message: string): Promise<SignRawMessageResponse>;
  encryptMessage(theirPublicKey: string, message: string): Promise<EncryptMessageResponse>;
  decryptMessage(theirPublicKey: string, cipherText: string): Promise<string>;
  getPrincipal(): Promise<string>;
}
