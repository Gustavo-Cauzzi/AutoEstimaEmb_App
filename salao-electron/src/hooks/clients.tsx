/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from 'react';

import uuid from 'uuid';
import Client from '../@types/Clients';

interface NewClientInfo {
  name: string;
  telephone: string[];
  description: string;
}

interface ClientContextData {
  clients: Client[];
  addNewClient: (info: NewClientInfo) => void;
}

interface iClientProvider{
  children: any;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

const ClientProvider: React.FC<iClientProvider> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);

  const refreshClientsInStorage = (refreshedClients?: Client[]) => {
    //nada ainda
  }

  const addNewClient = (info: NewClientInfo) => {
    const { name, description, telephone } = info;

    const refreshedClients = [
      ...clients,
      {
        id: uuid.v4(),
        name,
        description,
        telephone,
        appointmentNotes: [],
        appointments: [],
        currentDept: {},
      },
    ];

    setClients(refreshedClients);
    refreshClientsInStorage(refreshedClients);
  }

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
        addNewClient,
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
