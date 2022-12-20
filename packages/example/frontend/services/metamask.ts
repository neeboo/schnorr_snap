import {
  MetamaskSchnorrSnap,
  enableSchnorrSnap,
} from "@astrox/schnorr-snap-adapter"

export const defaultSnapId = "local:http://localhost:8081"

let isInstalled: boolean = false

export interface SnapInitializationResponse {
  isSnapInstalled: boolean
  snap?: MetamaskSchnorrSnap
}

export async function initiateSchnorrSnap(): Promise<SnapInitializationResponse> {
  const snapId = process.env.SNAP_ID
  // const snapId = defaultSnapId
  try {
    console.log("Attempting to connect to snap...")

    const metamaskSchnorrSnap = await enableSchnorrSnap(
      { network: "local" },
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
