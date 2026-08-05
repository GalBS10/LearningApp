import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { purchaseLessonUpgrade, restorePurchases } from '../purchases/iap';

export default function PaywallScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    try {
      await purchaseLessonUpgrade();
      // markUnlocked() runs inside the purchase listener (see App.tsx),
      // once the store confirms the transaction — not here.
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore() {
    setLoading(true);
    try {
      await restorePurchases();
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock all 90 items</Text>
      <Text style={styles.subtitle}>One-time purchase — $0.99</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Pressable style={styles.button} onPress={handlePurchase}>
            <Text style={styles.buttonText}>Unlock</Text>
          </Pressable>
          <Pressable onPress={handleRestore}>
            <Text style={styles.restoreText}>Restore purchase</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  button: { backgroundColor: '#222', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  restoreText: { marginTop: 16, color: '#666', textDecorationLine: 'underline' },
});
