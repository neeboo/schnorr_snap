import {
  MetamaskSchnorrRpcRequest,
  SignRawMessageResponse,
  SignMessageResponse,
  EncryptMessageResponse,
  SnapConfig,
} from '@astrox/schnorr-snap-types';
import { MetamaskSchnorrSnap } from './snap';
import { Signature } from '@dfinity/agent';

async function sendSnapMethod<T>(request: MetamaskSchnorrRpcRequest, snapId: string): Promise<T> {
  return await window.ethereum.request({
    method: snapId,
    params: [request],
  });
}

export async function configure(this: MetamaskSchnorrSnap, configuration: SnapConfig): Promise<void> {
  return await sendSnapMethod({ method: 'Schnorr_configure', params: { configuration: configuration } }, this.snapId);
}

export async function sign(this: MetamaskSchnorrSnap, message: string): Promise<SignMessageResponse> {
  return await sendSnapMethod({ method: 'Schnorr_sign', params: { message: message } }, this.snapId);
}

export async function signRawMessage(this: MetamaskSchnorrSnap, rawMessage: string): Promise<SignRawMessageResponse> {
  return await sendSnapMethod({ method: 'Schnorr_signRawMessage', params: { message: rawMessage } }, this.snapId);
}

export async function encryptMessage(this: MetamaskSchnorrSnap, theirPublicKey: string, message: string): Promise<EncryptMessageResponse> {
  return await sendSnapMethod({ method: 'Schnorr_encryptMessage', params: { theirPublicKey, message } }, this.snapId);
}

export async function decryptMessage(this: MetamaskSchnorrSnap, theirPublicKey: string, cipherText: string): Promise<string> {
  return await sendSnapMethod({ method: 'Schnorr_decryptMessage', params: { theirPublicKey, cipherText } }, this.snapId);
}

export async function getPrincipal(this: MetamaskSchnorrSnap): Promise<string> {
  return await sendSnapMethod({ method: 'Schnorr_getPrincipal' }, this.snapId);
}

export async function getRawPublicKey(this: MetamaskSchnorrSnap): Promise<string> {
  return await sendSnapMethod({ method: 'Schnorr_getRawPublicKey' }, this.snapId);
}
