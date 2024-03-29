import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClientProvider } from './clients';

const AppProvider: React.FC = ({ children }) => (
  <SafeAreaProvider>
    <ClientProvider>{children}</ClientProvider>
  </SafeAreaProvider>
);

export default AppProvider;
