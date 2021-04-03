import React from 'react';
import { ClientProvider } from './clients';

const ContextProvider: React.FC = ({ children }) => (
  <ClientProvider>{children}</ClientProvider>
)

export default ContextProvider;
