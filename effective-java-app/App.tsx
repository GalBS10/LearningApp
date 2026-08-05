import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { initIap, subscribeToPurchaseUpdates } from './src/purchases/iap';

export default function App() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initIap()
      .then(() => {
        unsubscribe = subscribeToPurchaseUpdates();
      })
      .catch((error) => console.error('IAP init failed:', error));

    return () => unsubscribe?.();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
