// Wraps react-native-iap. Do NOT redefine markUnlocked() here — the real
// implementation lives in appStorage.ts and is what canAccessItem() actually
// checks. A local duplicate here would silently break the paywall.

import * as RNIap from 'react-native-iap';
import { markUnlocked } from '../storage/appStorage';

const UNLOCK_SKU = 'unlock_all_lessons';

export async function initIap(): Promise<void> {
  await RNIap.initConnection();
}

export async function purchaseLessonUpgrade(): Promise<void> {
  try {
    await RNIap.requestPurchase({ sku: UNLOCK_SKU });
    // The actual unlock happens in the purchase listener below, once the
    // store confirms the transaction — not immediately after requesting it.
  } catch (error) {
    console.error('Purchase request failed:', error);
    throw error;
  }
}

// Register this once, e.g. in App.tsx on mount, so a successful purchase
// (including one restored on a fresh install) actually unlocks content.
export function subscribeToPurchaseUpdates(): () => void {
  const subscription = RNIap.purchaseUpdatedListener(async (purchase) => {
    if (purchase.productId === UNLOCK_SKU) {
      markUnlocked();
      try {
        await RNIap.finishTransaction({ purchase, isConsumable: false });
      } catch (error) {
        console.error('Failed to finish transaction:', error);
      }
    }
  });
  return () => subscription.remove();
}

export async function restorePurchases(): Promise<void> {
  const purchases = await RNIap.getAvailablePurchases();
  if (purchases.some((p) => p.productId === UNLOCK_SKU)) {
    markUnlocked();
  }
}
