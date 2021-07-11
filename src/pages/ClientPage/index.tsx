/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Linking, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { isBefore, isAfter } from 'date-fns';

import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import Client from '../../@types/Client';

import ClientOptionsMenuModal from '../../components/ClientOptionsMenuModal';

import {
  AppointmentContainer,
  AppointmentHeaderContainer,
  AppointmentHeaderText,
  Title,
  AppointmentText,
  AppointmentTextBold,
  ClientInfo,
  ClientInfoContainer,
  ClientName,
  ClientPhoneContainer,
  Container,
  Content,
  DebtQuantity,
  DebtStatus,
  DeptContainer,
  DescriptionInputContainer,
  DescriptionText,
  Header,
  PhoneNumber,
  UserIconContainer,
  EmptyAppointmentsContainer,
  EmptyAppointmentsText,
  AccordionTitleContainer,
  AppointmentNotesContent,
  InformationContainer,
  FloatingOptionsMenuContainer,
  CustomDescriptionInputContainer,
  TextBox,
  ButtonView,
  ButtonsContainer,
  ButtonText,
  EditIconContainer,
} from './styles';
import { useClients } from '../../hooks/clients';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import AlterDeptModal from '../../components/AlterDeptModal';
import AlterAppointmentNoteModal from '../../components/AlterAppointmentNoteModal';
import { formattedDate } from '../../utils/formattedDate';
import AppointmentNote from '../../@types/AppointmentNote';
import AlterClientInfo from '../../components/AlterClientInfo';

const ClientPage: React.FC = () => {
  const [client, setClient] = useState<Client>({
    appointmentNotes: [],
    appointments: [],
    id: 'clientNotDefinedYet',
    description: '',
    currentDept: {},
    name: '',
    telephone: [''],
  } as Client);
  const [activeSection, setActiveSection] = useState<number[]>([]);
  const [isOptionsModalActive, setIsOptionsModalActive] = useState(false);
  const [isClientInfoModalActive, setIsClientInfoModalActive] = useState(false);
  const [isDeptModalActive, setIsDeptModalActive] = useState(false);
  const [
    isAppointmentNoteModalActive,
    setIsAppointmentNoteModalActive,
  ] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<AppointmentNote>({
    date: Date.now(),
    description: '',
    value: 0,
    id: 'noAppointmentToEdit',
  });
  const [
    isAppointmentsAccordionOpen,
    setIsAppointmentsAccordionOpen,
  ] = useState<number[]>([0]);
  const [isInformationAccordionOpen, setIsInformationAccordionOpen] = useState<
    number[]
  >([]);
  const [
    isDescriptionBoxSelected,
    setIsDescriptionBoxSelected,
  ] = useState<boolean>(false);

  const route = useRoute();
  const { clients, updateClientDescription, updateClientDept } = useClients();

  useEffect(() => {
    if (client.id !== 'clientNotDefinedYet') {
      const refreshedClient = clients.find((c) => c.id === client.id);
      if (refreshedClient) {
        setClient(refreshedClient);
      }
    }
  }, [clients, client.id]);

  useEffect(() => {
    if (route.params) {
      console.log("route: ",route.params);
      setClient(route.params as Client);
    }
  }, [route.params]);

  const handleResetDept = useCallback(() => {
    Alert.alert('Zerar Dívida', 'Você tem certeza que queres zerar a dívida?', [
      {
        text: 'Sim',
        onPress: () => {
          updateClientDept(client.id, {});
        },
      },
      {
        text: 'Não',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
    ]);
  }, [client.id, updateClientDept]);

  return (
    <Container>
      <Header>
        <ClientInfoContainer>
          <UserIconContainer>
            <IconFeather
              name="user"
              size={40}
              color={'rgba(60, 60, 60, 0.4)'}
            />
          </UserIconContainer>
          <ClientInfo>
            <ClientName>{client.name}</ClientName>
            <FlatList
              data={client.telephone.filter((f) => (f ? f : null))}
              keyExtractor={(item, i) => `${item}_${i}`}
              ListEmptyComponent={() => (
                <ClientPhoneContainer style={{ marginLeft: -5 }}>
                  <PhoneNumber>Nenhum telefone {'\n'}registrado</PhoneNumber>
                </ClientPhoneContainer>
              )}
              renderItem={({ item: telephone, index }) => {
                if (index > 1 && index === 2) {
                  return (
                    <PhoneNumber style={{ fontSize: 13 }}>
                      Outros {client.telephone.length - 2}
                    </PhoneNumber>
                  );
                } else if (index > 1 && index !== 2) {
                  return <View />;
                } else {
                  return (
                    <ClientPhoneContainer>
                      <IconFeather
                        name="phone"
                        size={15}
                        color={'rgba(60, 60, 60, 0.4)'}
                        style={{ marginTop: 2 }}
                      />
                      <PhoneNumber>{telephone}</PhoneNumber>
                    </ClientPhoneContainer>
                  );
                }
              }}
            />
          </ClientInfo>
          {client.telephone.length !== 0 &&
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`whatsapp://send?phone=5554${client.telephone[0]}`)
              }}
            >
              <IconMaterialCommunity
                name="whatsapp"
                size={30}
                style={{
                  marginTop: 20,
                  marginRight: 5
                }}
              />
            </TouchableOpacity>
          }
        </ClientInfoContainer>
      </Header>
      <Content>
        <Accordion
          activeSections={isInformationAccordionOpen}
          sections={[client.description]}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          onChange={(section) => {
            setIsInformationAccordionOpen(section);
          }}
          renderHeader={(_, __, isActive) => {
            return (
              <AccordionTitleContainer>
                <Title style={{ fontFamily: 'Montserrat Regular' }}>
                  Informações
                </Title>
                {isActive ? (
                  <IconFeather
                    name="chevron-up"
                    size={25}
                    color={'rgba(249, 61, 142, 0.75)'}
                    style={{ marginLeft: -10 }}
                  />
                ) : (
                  <IconFeather
                    name="chevron-down"
                    size={25}
                    color={'rgba(249, 61, 142, 0.75)'}
                    style={{ marginLeft: -10 }}
                  />
                )}
              </AccordionTitleContainer>
            );
          }}
          renderContent={() => (
            <InformationContainer>
              <CustomDescriptionInputContainer
                isActive={isDescriptionBoxSelected}>
                <TextBox
                  value={client.description}
                  multiline={true}
                  autoCorrect={false}
                  onBlur={() => {
                    setIsDescriptionBoxSelected(false);
                    updateClientDescription(client.id, client.description);
                  }}
                  onFocus={() => {
                    setIsDescriptionBoxSelected(true);
                  }}
                  onChangeText={(newValue) => {
                    setClient((currentValue) => {
                      return {
                        ...currentValue,
                        description: newValue,
                      };
                    });
                  }}
                />
              </CustomDescriptionInputContainer>
            </InformationContainer>
          )}
        />
        <Accordion
          activeSections={isAppointmentsAccordionOpen}
          sections={[{}]}
          touchableComponent={TouchableOpacity}
          renderHeader={(_, __, isActive) => (
            <AccordionTitleContainer style={{ marginTop: 20 }}>
              <Title>Atendimentos</Title>
              {isActive ? (
                <IconFeather
                  name="chevron-up"
                  size={25}
                  color={'rgba(249, 61, 142, 0.75)'}
                  style={{ marginLeft: -10 }}
                />
              ) : (
                <IconFeather
                  name="chevron-down"
                  size={25}
                  color={'rgba(249, 61, 142, 0.75)'}
                  style={{ marginLeft: -10 }}
                />
              )}
            </AccordionTitleContainer>
          )}
          onChange={(sections) => {
            setIsAppointmentsAccordionOpen(sections);
          }}
          renderContent={() => (
            <AppointmentNotesContent>
              {client.appointmentNotes?.length === 0 ? (
                <EmptyAppointmentsContainer>
                  <EmptyAppointmentsText>
                    Nenhum registro de atendimentos
                  </EmptyAppointmentsText>
                </EmptyAppointmentsContainer>
              ) : (
                <Accordion
                  activeSections={activeSection}
                  sections={client.appointmentNotes?.sort((a, b) =>
                    isBefore(new Date(a.date), new Date(b.date))
                      ? -1
                      : isAfter(new Date(a.date), new Date(b.date))
                      ? 1
                      : 0,
                  )}
                  touchableComponent={TouchableOpacity}
                  expandMultiple={true}
                  onChange={(sections) => {
                    setActiveSection(sections);
                  }}
                  renderHeader={(item, _, isActive) => {
                    const date = formattedDate(item.date).split('-');
                    return (
                      <AppointmentHeaderContainer>
                        {isActive ? (
                          <IconFeather
                            name="chevron-up"
                            size={25}
                            color={'rgba(249, 61, 142, 0.75)'}
                            style={{ marginLeft: -10 }}
                          />
                        ) : (
                          <IconFeather
                            name="chevron-down"
                            size={25}
                            color={'rgba(249, 61, 142, 0.75)'}
                            style={{ marginLeft: -10 }}
                          />
                        )}
                        <AppointmentHeaderText>{date[0]}</AppointmentHeaderText>
                      </AppointmentHeaderContainer>
                    );
                  }}
                  renderContent={(item) => (
                    <AppointmentContainer>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <AppointmentTextBold>Valor:</AppointmentTextBold>
                          <AppointmentText>R$ {item.value},00</AppointmentText>
                        </View>
                        <EditIconContainer>
                          <TouchableNativeFeedback
                            onPress={() => {
                              setAppointmentToEdit(item);
                              setIsAppointmentNoteModalActive(true);
                            }}>
                            <EditIconContainer>
                              <IconFeather name="edit" size={17} color="#777" />
                            </EditIconContainer>
                          </TouchableNativeFeedback>
                        </EditIconContainer>
                      </View>
                      <AppointmentTextBold style={{ marginTop: 10 }}>
                        Descrição:
                      </AppointmentTextBold>
                      <DescriptionInputContainer>
                        <DescriptionText>{item.description}</DescriptionText>
                      </DescriptionInputContainer>
                    </AppointmentContainer>
                  )}
                />
              )}
            </AppointmentNotesContent>
          )}
        />

        <DeptContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Title fs={20}>Status de Dívida:</Title>
            <DebtStatus isInDept={!!client.currentDept?.value}>
              {client.currentDept?.value ? 'Devendo' : 'Sem Dívida'}
            </DebtStatus>
          </View>
          {client.currentDept?.value ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Title fs={17}>Quantidade:</Title>
              <DebtQuantity>R$ {client.currentDept?.value}</DebtQuantity>
            </View>
          ) : null}
          {client.currentDept?.since ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Title fs={17}>Desde:</Title>
              <DebtQuantity
                style={{ fontSize: 15, marginLeft: 5, marginTop: 2 }}>
                {formattedDate(client.currentDept?.since).split('-')[0]}
              </DebtQuantity>
            </View>
          ) : null}

          <ButtonsContainer
            style={{ marginTop: client.currentDept?.value ? 10 : 15 }}>
            <View style={{ marginRight: 10 }}>
              <TouchableNativeFeedback
                onPress={() => {
                  setIsDeptModalActive(true);
                }}>
                <ButtonView>
                  <ButtonText>Alterar Valor</ButtonText>
                </ButtonView>
              </TouchableNativeFeedback>
            </View>
            <View style={{ marginRight: 10 }}>
              <TouchableNativeFeedback onPress={handleResetDept}>
                <ButtonView>
                  <ButtonText>Zerar dívida</ButtonText>
                </ButtonView>
              </TouchableNativeFeedback>
            </View>
          </ButtonsContainer>
        </DeptContainer>
      </Content>

      <AlterDeptModal
        active={isDeptModalActive}
        client={client}
        onClose={() => {
          setIsDeptModalActive(false);
        }}
      />

      <AlterClientInfo
        active={isClientInfoModalActive}
        client={client}
        onClose={() => {
          setIsClientInfoModalActive(false);
        }}
      />

      <AlterAppointmentNoteModal
        active={isAppointmentNoteModalActive}
        appointment={appointmentToEdit}
        clientId={client.id}
        onClose={() => {
          setIsAppointmentNoteModalActive(false);
        }}
      />

      <FloatingOptionsMenuContainer
        onPress={() => {
          setIsOptionsModalActive(true);
        }}>
        <IconFeather name="menu" size={25} color="#fff" />
      </FloatingOptionsMenuContainer>

      <ClientOptionsMenuModal
        active={isOptionsModalActive}
        client={client}
        onClose={() => {
          setIsOptionsModalActive(false);
        }}>
        <FloatingOptionsMenuContainer>
          <IconFeather name="x" size={25} color="#fff" />
        </FloatingOptionsMenuContainer>
      </ClientOptionsMenuModal>
    </Container>
  );
};

export default ClientPage;
