import React from 'react';
import { View, Text } from 'react-native';

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <View>
      <Text>{code}</Text>
    </View>
  );
};

export default CodeBlock;
