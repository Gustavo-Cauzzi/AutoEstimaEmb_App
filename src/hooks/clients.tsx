/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from 'react';
import uuid from 'react-native-uuid';

import Client from '../@types/Client';

interface ClientContextData {
  clients: Client[];
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

const ClientProvider: React.FC = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: uuid.v4(),
      name: 'José 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'José 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'José 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'José 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'José 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'bdasb 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'vdsvds 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'asdsadsa 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'Jsadsa',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'Aaaa 1',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['32133223'],
    },
    {
      id: uuid.v4(),
      name: 'José 2',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: [],
    },
    {
      id: uuid.v4(),
      name: 'José 3',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['92093929'],
    },
    {
      id: uuid.v4(),
      name: 'José 4',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: ['16151656'],
    },
    {
      id: uuid.v4(),
      name: 'José 5',
      appointmentNotes: [],
      appointments: [],
      currentDept: 0,
      telephone: [],
    },
  ]);

  return (
    <ClientContext.Provider
      value={{
        clients: clients.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        }),
      }}>
      {children}
    </ClientContext.Provider>
  );
};

const useClients = (): ClientContextData => {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error('useSongs must be used within an ClientContextProvider');
  }

  return context;
};

export { useClients, ClientProvider };
