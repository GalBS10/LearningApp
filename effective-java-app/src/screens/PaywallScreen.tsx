import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { markUnlocked } from '../storage/appStorage';

// Placeholder — real react-native-iap purchase flow replaces the button
// handler below. markUnlocked() should only ever be called after a
// verified receipt, never directly like this in production.
export default function PaywallScreen() {
  const navigation = useNavigation<any>();

  function handleFakeUnlock() {
    markUnlocked();
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock all 90 items</Text>
      <Text style={styles.subtitle}>One-time purchase — $0.99</Text>
      <Pressable style={styles.button} onPress={handleFakeUnlock}>
        <Text style={styles.buttonText}>Unlock (placeholder)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  button: { backgroundColor: '#222', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
