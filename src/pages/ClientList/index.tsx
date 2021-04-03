/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ClientButton,
  ClientContainer,
  ClientName,
  Container,
  Content,
  FloatingSerachButtonContainer,
  Header,
  Logo,
  NewClientButton,
  NewClientButtonContainer,
  NewClientButtonText,
  SearchInput,
  SearchInputContainer,
  Title,
  UserIconContainer,
} from './styles';

import TransparentLogo from '../../../assets/LogoTransparente.png';
import { useClients } from '../../hooks/clients';
import Client from '../../@types/Client';
import AlterClientInfo from '../../components/AlterClientInfo';

interface ClientListProps {
  navigation?: any;
}

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList as new () => FlatList<Client>,
);

const HEADER_HEIGHT = 60;

const ClientList: React.FC<ClientListProps> = ({ navigation }) => {
  const [isSearchModeActive, setIsSearchModeActive] = useState(false);
  const [searchClientsResult, setSearchClientsResult] = useState<Client[]>([]);
  const [isNewClientModalActive, setIsNewClientModalActive] = useState(false);

  const { clients } = useClients();

  const scroll = useMemo(() => new Animated.Value(0), []);
  const animatedScroll = Animated.multiply(
    Animated.diffClamp(scroll, 0, HEADER_HEIGHT),
    -1,
  );

  const handleSerachButtonPressed = useCallback(() => {
    setIsSearchModeActive(!isSearchModeActive);
    setSearchClientsResult(clients);
  }, [isSearchModeActive, clients]);

  const handleGoToClientPage = useCallback(
    (client: Client) => {
      navigation.navigate('ClientPage', { ...client });
    },
    [navigation],
  );

  return (
    <Container>
      <Header
        as={Animated.View}
        style={[{ transform: [{ translateY: animatedScroll }] }]}>
        {isSearchModeActive ? (
          <SearchInputContainer>
            <SearchInput
              autoFocus={true}
              onChangeText={(newText) => {
                if (newText === '') {
                  setSearchClientsResult(clients);
                } else {
                  const search = clients.filter((client) =>
                    client.name.toLowerCase().includes(newText.toLowerCase()),
                  );

                  setSearchClientsResult(search);
                }
              }}
            />
            <IconMaterialCommunityIcons
              name="magnify"
              size={25}
              color={'#777'}
            />
          </SearchInputContainer>
        ) : (
          <>
            <Title>Fichário de Clientes</Title>
            <Logo source={{ uri: TransparentLogo }} />
          </>
        )}
      </Header>
      <Content>
        <AnimatedFlatList
          data={isSearchModeActive ? searchClientsResult : clients}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true },
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              <View style={{ height: HEADER_HEIGHT }} />
              <NewClientButtonContainer>
                <NewClientButton
                  onPress={() => {
                    setIsNewClientModalActive(true);
                  }}>
                  <NewClientButtonText>+ Novo Cliente</NewClientButtonText>
                </NewClientButton>
              </NewClientButtonContainer>
            </>
          )}
          renderItem={({ item: client }) => (
            <ClientContainer>
              <ClientButton
                onPress={() => {
                  handleGoToClientPage(client);
                }}>
                <UserIconContainer>
                  <IconFeather
                    name="user"
                    size={20}
                    color={'rgba(60, 60, 60, 0.4)'}
                  />
                </UserIconContainer>
                <ClientName>{client.name}</ClientName>
              </ClientButton>
            </ClientContainer>
          )}
        />
      </Content>
      <FloatingSerachButtonContainer onPress={handleSerachButtonPressed}>
        {isSearchModeActive ? (
          <IconMaterialCommunityIcons name="close" size={30} color={'#777'} />
        ) : (
          <IconMaterialCommunityIcons name="magnify" size={30} color={'#777'} />
        )}
      </FloatingSerachButtonContainer>

      <AlterClientInfo
        client={{
          id: 'NewClient',
          appointmentNotes: [],
          appointments: [],
          currentDept: {},
          description: '',
          name: '',
          telephone: [],
        }}
        active={isNewClientModalActive}
        onClose={() => {
          setIsNewClientModalActive(false);
        }}
      />
    </Container>
  );
};

export default ClientList;
