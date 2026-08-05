import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getCompletedCount, getCurrentStreak, getLongestStreak } from '../storage/appStorage';
import { TOTAL_ITEMS } from '../content';

const ProgressScreen = () => {
  const completed = getCompletedCount(TOTAL_ITEMS);
  const streak = getCurrentStreak();
  const longestStreak = getLongestStreak();

  return (
    <View style={styles.container}>
      <View style={styles.statBlock}>
        <Text style={styles.statValue}>{completed}/{TOTAL_ITEMS}</Text>
        <Text style={styles.statLabel}>items mastered</Text>
      </View>
      <View style={styles.statBlock}>
        <Text style={styles.statValue}>🔥 {streak}</Text>
        <Text style={styles.statLabel}>day streak</Text>
      </View>
      <View style={styles.statBlock}>
        <Text style={styles.statValue}>{longestStreak}</Text>
        <Text style={styles.statLabel}>longest streak</Text>
      </View>
    </View>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  statBlock: { marginBottom: 24 },
  statValue: { fontSize: 28, fontWeight: '700' },
  statLabel: { fontSize: 14, color: '#888' },
});
