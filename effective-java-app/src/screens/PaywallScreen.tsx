import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { purchaseLessonUpgrade, restorePurchases } from '../purchases/iap';
import { getPurchaseStatus } from '../storage/appStorage';

export default function PaywallScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const isUnlocked = getPurchaseStatus() === 'unlocked';

  async function handlePurchase() {
    setLoading(true);
    try {
      await purchaseLessonUpgrade();
      // The store listener in App.tsx will call markUnlocked().
      // If purchase succeeds, user can dismiss or listener handles state.
      Alert.alert(
        'Purchase Initiated',
        'Once confirmed by the store, all 90 lessons will be instantly unlocked.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      if (error?.code !== 'E_USER_CANCELLED') {
        Alert.alert('Purchase Failed', error?.message || 'Could not complete purchase. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore() {
    setLoading(true);
    try {
      await restorePurchases();
      if (getPurchaseStatus() === 'unlocked') {
        Alert.alert('Restored', 'Your purchase was successfully restored!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('No Purchase Found', 'We could not find an active purchase for this account.');
      }
    } catch (error: any) {
      Alert.alert('Restore Failed', error?.message || 'Failed to restore purchases.');
    } finally {
      setLoading(false);
    }
  }

  if (isUnlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.badge}>🎉</Text>
        <Text style={styles.title}>All Lessons Unlocked</Text>
        <Text style={styles.subtitle}>You have full access to all 90 Effective Java items.</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Continue Learning</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock all 90 items</Text>
      <Text style={styles.subtitle}>One-time purchase — $0.99</Text>
      <Text style={styles.perks}>
        • Access all 90 Effective Java lessons{'\n'}
        • Full quiz bank & interview questions{'\n'}
        • Lifetime access, offline-ready
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#222" style={styles.loader} />
      ) : (
        <>
          <Pressable style={styles.button} onPress={handlePurchase}>
            <Text style={styles.buttonText}>Unlock Now ($0.99)</Text>
          </Pressable>
          <Pressable onPress={handleRestore} style={styles.restoreButton}>
            <Text style={styles.restoreText}>Restore purchase</Text>
          </Pressable>
          <Pressable onPress={() => navigation.goBack()} style={styles.dismissButton}>
            <Text style={styles.dismissText}>Maybe later</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  badge: { fontSize: 44, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 16, textAlign: 'center' },
  perks: { fontSize: 14, lineHeight: 24, color: '#444', marginBottom: 28, alignSelf: 'flex-start', paddingHorizontal: 16 },
  loader: { marginVertical: 20 },
  button: { backgroundColor: '#222', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  restoreButton: { marginTop: 16, padding: 8 },
  restoreText: { color: '#666', textDecorationLine: 'underline', fontSize: 14 },
  dismissButton: { marginTop: 12, padding: 8 },
  dismissText: { color: '#999', fontSize: 14 },
});
