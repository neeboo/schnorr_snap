import {
  MetamaskSchnorrSnap,
  enableSchnorrSnap,
} from "@astrox/schnorr-snap-adapter"
import { SchnorrNetwork } from "@astrox/schnorr-snap-types"

export const defaultSnapId = "local:http://localhost:8081"

let isInstalled: boolean = false

export interface SnapInitializationResponse {
  isSnapInstalled: boolean
  snap?: MetamaskSchnorrSnap
}

export async function initiateSchnorrSnap(
  network: SchnorrNetwork = "local",
): Promise<SnapInitializationResponse> {
  const snapId = process.env.SNAP_ID

  // const snapId = defaultSnapId
  try {
    console.log("Attempting to connect to snap...")

    const metamaskSchnorrSnap = await enableSchnorrSnap(
      { network }, // 'mainnet', 'nostr'
      snapId,
      {
        version: "latest",
      },
    )
    isInstalled = true
    console.log("Snap installed!")
    return { isSnapInstalled: true, snap: metamaskSchnorrSnap }
  } catch (e) {
    console.error(e)
    isInstalled = false
    return { isSnapInstalled: false }
  }
}

export async function isSchnorrSnapInstalled(): Promise<boolean> {
  return isInstalled
}
