/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';

import { Text } from 'react-native';
import Client from '../../@types/Client';

import { Container } from './styles';

const ClientPage: React.FC = () => {
  const [client, setClient] = useState<Client>({} as Client);

  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setClient(route.params as Client);
    }
  }, [route.params]);

  return (
    <Container>
      <Text>{client.name}</Text>
    </Container>
  );
};

export default ClientPage;
