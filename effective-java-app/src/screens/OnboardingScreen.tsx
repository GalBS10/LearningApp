import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { setDailyGoalMinutes, setOnboarded } from '../storage/appStorage';
import { requestNotificationPermission, setupNotificationChannel, scheduleDailyReminder } from '../notifications/scheduler';

const GOAL_OPTIONS = [5, 10, 15, 20];

const OnboardingScreen = ({ navigation }: any) => {
  const [selectedGoal, setSelectedGoal] = useState(10);

  async function handleContinue() {
    setDailyGoalMinutes(selectedGoal);
    setOnboarded();

    const granted = await requestNotificationPermission();
    if (granted) {
      await setupNotificationChannel();
      await scheduleDailyReminder();
    }

    navigation.replace('LessonFeed');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>How many minutes a day do you want to study?</Text>

      <View style={styles.options}>
        {GOAL_OPTIONS.map((minutes) => (
          <Pressable
            key={minutes}
            style={[styles.option, selectedGoal === minutes && styles.optionSelected]}
            onPress={() => setSelectedGoal(minutes)}
          >
            <Text
              style={[styles.optionText, selectedGoal === minutes && styles.optionTextSelected]}
            >
              {minutes} min
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  options: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  optionSelected: { backgroundColor: '#222', borderColor: '#222' },
  optionText: { fontSize: 14 },
  optionTextSelected: { color: '#fff' },
  button: { backgroundColor: '#222', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
