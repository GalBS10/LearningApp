import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { getLessonByItemNumber } from '../content';

// Placeholder — concept/flashcard/quiz rendering comes in a follow-up pass.
export default function LessonDetailScreen() {
  const route = useRoute<any>();
  const { itemNumber } = route.params as { itemNumber: number };
  const lesson = getLessonByItemNumber(itemNumber);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Item {itemNumber} content not generated yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {lesson.item_number}. {lesson.title}
      </Text>
      <Text style={styles.concept}>{lesson.concept}</Text>
      {/* TODO: wrong/right code blocks, flashcards, quiz, interview questions */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  concept: { fontSize: 15, lineHeight: 22 },
});
