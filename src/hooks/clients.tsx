/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppointmentNote from '../@types/AppointmentNote';
import Client from '../@types/Client';
import Dept from '../@types/Dept';
import uuid from 'react-native-uuid';
import { database } from '../services/firebase';
import Appointment from '../@types/Appointment';


interface NewClientInfo {
  name: string;
  telephone: string[];
  description: string;
}
interface ClientContextData {
  clients: Client[];
  isLoading: boolean;
  addAppointmentToClient: (clientId: string, info: AppointmentNote) => void;
  updateClientDescription: (clientId: string, description: string) => void;
  updateClientDept: (clientId: string, newDeptInfo: Dept) => void;
  updateClientAppointmentNote: (
    clientId: string,
    newAppointmentNoteInfo: AppointmentNote,
  ) => void;
  updateClientInfo: (clientId: string, info: NewClientInfo) => void;
  addNewClient: (info: NewClientInfo) => void;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

const ClientProvider: React.FC = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAsyncInfo = async () => {
    const clients = await database()
    .ref('/clients')
    .once('value')
    .then(snapshot => snapshot.val());

    const formattedValues = clients.map((client: Partial<Client>) => ({
      id: client.id,
      name: client.name,
      telephone: client.telephone ? client.telephone : [] as string[],
      description: client.name,
      appointmentNotes: client.appointmentNotes ? client.appointmentNotes : [] as AppointmentNote[],
      appointments: client.appointments ? client.appointments : [] as Appointment[],
      currentDept: client.currentDept ? client.currentDept : {} as Dept,
      ...client
    }));

    setIsLoading(false);
    setClients(formattedValues);
  };

  useEffect(() => {
    loadAsyncInfo();
  }, []);

  const refreshClientsInStorage = useCallback(
    (refreshedClients?: Client[]) => {
      if (refreshedClients) {
        AsyncStorage.setItem(
          'AppSalao:Clients',
          JSON.stringify(refreshedClients),
        );
      } else {
        AsyncStorage.setItem('AppSalao:Clients', JSON.stringify(clients));
      }
    },
    [clients],
  );

  const addAppointmentToClient = useCallback(
    (clientId: string, info: AppointmentNote) => {
      const clientExists = clients.find((c) => c.id === clientId);
      if (!clientExists) {
        console.log(
          `Client with id ${clientId} doesn't exist (addAppointmentToClient)`,
        );
        return;
      }

      const refreshedClients = clients.map((c) =>
        c.id === clientId
          ? {
              ...c,
              appointmentNotes: [
                ...c.appointmentNotes,
                {
                  id: info.id,
                  date: info.date ? info.date : Date.now(),
                  description: info.description ? info.description : '',
                  value: info.value ? info.value : 0,
                },
              ],
            }
          : c,
      );

      setClients(refreshedClients);
      ToastAndroid.show('Atendimento adicionado', ToastAndroid.SHORT);
      refreshClientsInStorage(refreshedClients);
    },
    [clients, refreshClientsInStorage],
  );

  const updateClientDescription = useCallback(
    (clientId: string, description: string) => {
      const clientExists = clients.find((c) => c.id === clientId);
      if (!clientExists) {
        console.log(
          `Client with id ${clientId} doesn't exist (updateClientDescription)`,
        );
        return;
      }

      const refreshedClients = clients.map((c) =>
        c.id === clientId
          ? {
              ...c,
              description,
            }
          : c,
      );

      setClients(refreshedClients);
      refreshClientsInStorage(refreshedClients);
    },
    [clients, refreshClientsInStorage],
  );

  const updateClientDept = useCallback(
    (clientId: string, newDeptInfo: Dept) => {
      const clientExists = clients.find((c) => c.id === clientId);
      if (!clientExists) {
        console.log(
          `Client with id ${clientId} doesn't exist (updateClientDept)`,
        );
        return;
      }

      const refreshedClients = clients.map((c) =>
        c.id === clientId
          ? {
              ...c,
              currentDept: newDeptInfo,
            }
          : c,
      );

      setClients(refreshedClients);
      ToastAndroid.show('Dívida Atualizada', ToastAndroid.SHORT);
      refreshClientsInStorage(refreshedClients);
    },
    [clients, refreshClientsInStorage],
  );

  const updateClientAppointmentNote = useCallback(
    (clientId: string, newAppointmentNoteInfo: AppointmentNote) => {
      const clientExists = clients.find((c) => c.id === clientId);
      if (!clientExists) {
        console.log(
          `Client with id ${clientId} doesn't exist (updateClientAppointmentNote)`,
        );
        return;
      }

      const refreshedClients = clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              appointmentNotes: client.appointmentNotes?.map((appointment) =>
                appointment.id === newAppointmentNoteInfo.id
                  ? newAppointmentNoteInfo
                  : appointment,
              ),
            }
          : client,
      );

      setClients(refreshedClients);
      refreshClientsInStorage(refreshedClients);
    },
    [clients, refreshClientsInStorage],
  );

  const updateClientInfo = useCallback(
    (clientId: string, info: NewClientInfo) => {
      const clientExists = clients.find((c) => c.id === clientId);
      if (!clientExists) {
        console.log(
          `Client with id ${clientId} doesn't exist (updateClientInfo)`,
        );
        return;
      }

      const { description, name, telephone } = info;

      const refreshedClients = clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              name,
              description,
              telephone,
            }
          : client,
      );

      setClients(refreshedClients);
      ToastAndroid.show('Informações Atualizadas', ToastAndroid.SHORT);
      refreshClientsInStorage(refreshedClients);
    },
    [clients, refreshClientsInStorage],
  );

  const addNewClient = useCallback(
    (info: NewClientInfo) => {
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
      ToastAndroid.show('Novo Cliente Adicionado', ToastAndroid.SHORT);
    },
    [clients, refreshClientsInStorage],
  );

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
        isLoading,
        addAppointmentToClient,
        updateClientDescription,
        updateClientDept,
        updateClientAppointmentNote,
        updateClientInfo,
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
