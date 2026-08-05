import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import LessonFeedScreen from '../screens/LessonFeedScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import PaywallScreen from '../screens/PaywallScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { hasOnboarded } from '../storage/appStorage';

// Note: QuizScreen isn't registered here — the quiz is now rendered inline
// inside LessonDetailScreen (see the fix summary). Left in src/screens/ in
// case you want a standalone "review missed questions" screen later — add
// it back to this navigator when that's built out.

export type RootStackParamList = {
  Onboarding: undefined;
  LessonFeed: undefined;
  LessonDetail: { itemNumber: number };
  Paywall: undefined;
  Progress: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const initialRouteName = hasOnboarded() ? 'LessonFeed' : 'Onboarding';

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessonFeed"
        component={LessonFeedScreen}
        options={{ title: 'Effective Java' }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ title: 'Lesson' }}
      />
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ title: 'Unlock', presentation: 'modal' }}
      />
      <Stack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: 'Your Progress' }}
      />
    </Stack.Navigator>
  );
}
