import React from 'react';
import { View, Text, Button } from 'react-native';

const QuizQuestion = ({ question }: { question: any }) => {
  return (
    <View>
      <Text>{question.question}</Text>
      {question.options?.map((option: string) => (
        <Button key={option} title={option} onPress={() => {}} />
      ))}
    </View>
  );
};

export default QuizQuestion;
