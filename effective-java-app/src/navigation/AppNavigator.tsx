import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LessonFeedScreen from '../screens/LessonFeedScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import PaywallScreen from '../screens/PaywallScreen';

export type RootStackParamList = {
  LessonFeed: undefined;
  LessonDetail: { itemNumber: number };
  Paywall: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LessonFeed">
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
    </Stack.Navigator>
  );
}
