import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { getLessonByItemNumber } from '../content';
import { markItemComplete, addStudyMinutes } from '../storage/appStorage';
import CodeBlock from '../components/CodeBlock';
import Flashcard from '../components/Flashcard';
import QuizQuestion from '../components/QuizQuestion';
import InterviewQuestionCard from '../components/InterviewQuestionCard';

export default function LessonDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { itemNumber } = route.params as { itemNumber: number };
  const lesson = getLessonByItemNumber(itemNumber);

  const [answers, setAnswers] = useState<boolean[]>([]);

  // Automatically record study time while the lesson is active
  useEffect(() => {
    const INTERVAL_SECONDS = 30;
    const interval = setInterval(() => {
      addStudyMinutes(INTERVAL_SECONDS / 60);
    }, INTERVAL_SECONDS * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Item {itemNumber} content not generated yet.</Text>
      </View>
    );
  }

  function handleAnswered(correct: boolean) {
    const next = [...answers, correct];
    setAnswers(next);
    if (next.length === lesson!.quiz.length) {
      const score = next.filter(Boolean).length / next.length;
      markItemComplete(lesson!.item_number, score);
    }
  }

  const allAnswered = answers.length === lesson.quiz.length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {lesson.item_number}. {lesson.title}
      </Text>
      <Text style={styles.concept}>{lesson.concept}</Text>

      <Text style={styles.sectionHeader}>Wrong</Text>
      <CodeBlock code={lesson.wrong_code.class} />
      <CodeBlock code={lesson.wrong_code.call_site} />

      <Text style={styles.sectionHeader}>Right</Text>
      <CodeBlock code={lesson.right_code.class} />
      <CodeBlock code={lesson.right_code.call_site} />

      <Text style={styles.sectionHeader}>When to use</Text>
      <Flashcard
        front={lesson.when_to_use_flashcard.front}
        back={lesson.when_to_use_flashcard.back}
      />

      <Text style={styles.sectionHeader}>When not to use</Text>
      <Flashcard
        front={lesson.when_not_to_use_flashcard.front}
        back={lesson.when_not_to_use_flashcard.back}
      />

      <Text style={styles.sectionHeader}>Quiz</Text>
      {lesson.quiz.map((q, i) => (
        <QuizQuestion key={i} question={q} onAnswered={handleAnswered} />
      ))}

      {allAnswered && (
        <View style={styles.doneBanner}>
          <Text style={styles.doneText}>
            Lesson complete — {answers.filter(Boolean).length}/{answers.length} correct
          </Text>
        </View>
      )}

      {lesson.interview_questions && lesson.interview_questions.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Interview Questions</Text>
          {lesson.interview_questions.map((iq, i) => (
            <InterviewQuestionCard key={i} question={iq} index={i} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  concept: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
  sectionHeader: { fontSize: 14, fontWeight: '700', marginTop: 16, marginBottom: 8, color: '#888' },
  doneBanner: { marginTop: 20, padding: 14, backgroundColor: '#eaf6ea', borderRadius: 8 },
  doneText: { fontWeight: '600', color: '#2e7d32' },
});
