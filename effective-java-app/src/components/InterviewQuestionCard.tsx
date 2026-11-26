import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { InterviewQuestion as InterviewQuestionType, InterviewQuestionType as QType } from '../types/lesson';

interface Props {
  question: InterviewQuestionType;
  index: number;
}

function typeLabel(type: QType): string {
  switch (type) {
    case 'conceptual':
      return '💡 Conceptual';
    case 'spot_the_issue':
      return '🔍 Spot the Issue';
    case 'gotcha':
      return '⚠️ Gotcha';
    case 'applied':
      return '🛠️ Applied';
    default:
      return '💬 Interview Q';
  }
}

export default function InterviewQuestionCard({ question, index }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.indexLabel}>Q{index + 1}</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{typeLabel(question.type)}</Text>
        </View>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>

      <Pressable
        style={styles.revealButton}
        onPress={() => setRevealed(!revealed)}
        accessibilityRole="button"
      >
        <Text style={styles.revealButtonText}>
          {revealed ? 'Hide Model Answer' : 'Reveal Model Answer'}
        </Text>
      </Pressable>

      {revealed && (
        <View style={styles.answerBox}>
          <Text style={styles.answerHeader}>Model Answer:</Text>
          <Text style={styles.answerText}>{question.model_answer}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9fb',
    borderWidth: 1,
    borderColor: '#e8e8ed',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  indexLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
  },
  typeBadge: {
    backgroundColor: '#ececf2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  questionText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  revealButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#222',
    borderRadius: 6,
  },
  revealButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  answerBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#edf7ed',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },
  answerHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1b4d1e',
  },
});
