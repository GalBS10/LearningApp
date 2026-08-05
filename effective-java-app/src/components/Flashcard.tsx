import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Flashcard = ({ front, back }: { front: string; back: string }) => {
  const [revealed, setRevealed] = React.useState(false);

  return (
    <TouchableOpacity onPress={() => setRevealed(!revealed)}>
      <View>
        <Text>{revealed ? back : front}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Flashcard;
