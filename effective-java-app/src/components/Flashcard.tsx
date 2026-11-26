import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  front: string;
  back: string;
}

const Flashcard = ({ front, back }: Props) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setRevealed(!revealed)}
      style={[styles.card, revealed ? styles.cardBack : styles.cardFront]}
      accessibilityRole="button"
      accessibilityLabel="Flashcard. Tap to flip."
    >
      <View style={styles.header}>
        <Text style={[styles.tag, revealed ? styles.tagBack : styles.tagFront]}>
          {revealed ? 'Answer' : 'Scenario / Prompt'}
        </Text>
        <Text style={styles.flipHint}>🔄 Tap to flip</Text>
      </View>
      <Text style={[styles.text, revealed && styles.textBack]}>
        {revealed ? back : front}
      </Text>
    </TouchableOpacity>
  );
};

export default Flashcard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  cardFront: {
    backgroundColor: '#f8f9fc',
    borderColor: '#e1e4ed',
  },
  cardBack: {
    backgroundColor: '#f0f7f4',
    borderColor: '#cce6db',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagFront: {
    color: '#556',
  },
  tagBack: {
    color: '#1b6d45',
  },
  flipHint: {
    fontSize: 12,
    color: '#888',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: '#222',
  },
  textBack: {
    color: '#114a2e',
    fontWeight: '500',
  },
});
