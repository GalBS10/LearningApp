import React from 'react';
import { View, Text, Button } from 'react-native';

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>Welcome! Set your daily goal and enable notifications.</Text>
      <Button title="Set Daily Goal" onPress={() => navigation.navigate('LessonFeed')} />
    </View>
  );
};

export default OnboardingScreen;
