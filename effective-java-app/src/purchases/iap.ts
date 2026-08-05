import * as RNIap from 'react-native-iap';

export async function purchaseLessonUpgrade() {
  try {
    const purchase = await RNIap.requestPurchase('unlock_all_lessons');
    return purchase;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function markUnlocked() {
  // TODO: mark lessons unlocked after successful purchase
}
