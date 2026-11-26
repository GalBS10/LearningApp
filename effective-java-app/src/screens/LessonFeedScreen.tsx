import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { ALL_ITEMS, TOTAL_ITEMS } from '../content';
import {
  canAccessItem,
  isFreeItem,
  getItemProgress,
  getHighestUnlockedItem,
  getCompletedCount,
  getCurrentStreak,
} from '../storage/appStorage';

type RowState = 'completed' | 'current' | 'locked_sequential' | 'locked_paywall';

interface FeedRow {
  itemNumber: number;
  title: string;
  state: RowState;
}

function getRowState(itemNumber: number, highestUnlocked: number): RowState {
  if (getItemProgress(itemNumber).completed) return 'completed';
  if (!canAccessItem(itemNumber)) return 'locked_paywall';
  // Free trial items can always be previewed without sequential gating
  if (!isFreeItem(itemNumber) && itemNumber > highestUnlocked) return 'locked_sequential';
  return 'current';
}

export default function LessonFeedScreen() {
  const navigation = useNavigation<any>();
  const [rows, setRows] = useState<FeedRow[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [streak, setStreak] = useState(0);

  // Refresh feed states and stats whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const highestUnlocked = getHighestUnlockedItem(TOTAL_ITEMS);
      const updatedRows: FeedRow[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
        const itemNumber = i + 1;
        const lesson = ALL_ITEMS.find((l) => l.item_number === itemNumber);
        return {
          itemNumber,
          title: lesson?.title ?? `Item ${itemNumber} (coming soon)`,
          state: getRowState(itemNumber, highestUnlocked),
        };
      });
      setRows(updatedRows);
      setCompletedCount(getCompletedCount(TOTAL_ITEMS));
      setStreak(getCurrentStreak());
    }, [])
  );

  function handlePress(row: FeedRow) {
    if (row.state === 'locked_sequential') return; // no-op, must go in order
    if (row.state === 'locked_paywall') {
      navigation.navigate('Paywall');
      return;
    }
    navigation.navigate('LessonDetail', { itemNumber: row.itemNumber });
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => navigation.navigate('Progress')}
        accessibilityRole="button"
        accessibilityLabel="View progress and streaks"
      >
        <Text style={styles.headerStat}>{completedCount}/{TOTAL_ITEMS} mastered</Text>
        <Text style={styles.headerStat}>🔥 {streak} day streak →</Text>
      </Pressable>

      <FlatList
        data={rows}
        keyExtractor={(row) => String(row.itemNumber)}
        renderItem={({ item: row }) => (
          <Pressable
            style={[styles.row, row.state === 'locked_sequential' && styles.rowDisabled]}
            onPress={() => handlePress(row)}
            disabled={row.state === 'locked_sequential'}
          >
            <Text style={styles.rowNumber}>{row.itemNumber}</Text>
            <Text style={styles.rowTitle} numberOfLines={1}>
              {row.title}
            </Text>
            <Text style={styles.rowBadge}>{badgeFor(row.state)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

function badgeFor(state: RowState): string {
  switch (state) {
    case 'completed':
      return '✅';
    case 'current':
      return '▶️';
    case 'locked_sequential':
      return '🔒';
    case 'locked_paywall':
      return '💎';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerStat: { fontSize: 14, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  rowDisabled: { opacity: 0.4 },
  rowNumber: { width: 28, fontWeight: '700', color: '#888' },
  rowTitle: { flex: 1, fontSize: 15 },
  rowBadge: { marginLeft: 8 },
});
