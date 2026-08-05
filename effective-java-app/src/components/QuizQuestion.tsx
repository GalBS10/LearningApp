import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { QuizQuestion as QuizQuestionType } from '../types/lesson';

interface Props {
  question: QuizQuestionType;
  onAnswered?: (correct: boolean) => void;
}

const QuizQuestion = ({ question, onAnswered }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(index: number) {
    if (selected !== null) return; // already answered, lock in the choice
    setSelected(index);
    onAnswered?.(index === question.correct_index);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, index) => {
        const isSelected = selected === index;
        const isCorrect = index === question.correct_index;
        const showResult = selected !== null;

        return (
          <Pressable
            key={index}
            onPress={() => handleSelect(index)}
            style={[
              styles.option,
              showResult && isCorrect && styles.optionCorrect,
              showResult && isSelected && !isCorrect && styles.optionWrong,
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  question: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  optionCorrect: { borderColor: '#2e7d32', backgroundColor: '#eaf6ea' },
  optionWrong: { borderColor: '#c62828', backgroundColor: '#fbeaea' },
  optionText: { fontSize: 14 },
});
