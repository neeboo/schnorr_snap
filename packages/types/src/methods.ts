import { SnapConfig } from './snap';

export abstract class WalletMethod {
  static enable: string = 'wallet_enable';
  static getSnaps: string = 'wallet_getSnaps';
  static installSnaps: string = 'wallet_installSnaps';
  static invokeSnaps: string = 'wallet_invokeSnap';
}

export const SchnorrCoin = 'BTC';
export const SchnorrCoinCode = 0;

export abstract class SnapMethods {
  static confirm: string = 'snap_confirm';
  static manageState: string = 'snap_manageState';
  static getBip44Entropy: string = `snap_getBip44Entropy_${SchnorrCoinCode}`;
}

export type MetamaskState = {
  schnorr: {
    config: SnapConfig;
    messages: ArrayBuffer[];
  };
};

export interface ConfigureRequest {
  method: 'Schnorr_configure';
  params: {
    configuration: SnapConfig;
  };
}

export interface SignRequest {
  method: 'Schnorr_sign';
  params: {
    message: string;
  };
}
export interface SignRawMessageRequest {
  method: 'Schnorr_signRawMessage';
  params: {
    message: string;
  };
}

export interface EncryptMessageRequest {
  method: 'Schnorr_encryptMessage';
  params: {
    theirPublicKey: string;
    message: string;
  };
}

export interface DecryptMessageRequest {
  method: 'Schnorr_decryptMessage';
  params: {
    theirPublicKey: string;
    cipherText: string;
  };
}

export interface GetRawPublicKey {
  method: 'Schnorr_getRawPublicKey';
}

export interface GetPrincipal {
  method: 'Schnorr_getPrincipal';
}

export type MetamaskSchnorrRpcRequest =
  | ConfigureRequest
  | SignRequest
  | SignRawMessageRequest
  | GetPrincipal
  | GetRawPublicKey
  | EncryptMessageRequest
  | DecryptMessageRequest;

type Method = MetamaskSchnorrRpcRequest['method'];
