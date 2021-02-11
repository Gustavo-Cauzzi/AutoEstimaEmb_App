/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  TouchableNativeFeedback,
  Modal,
  Animated,
  Keyboard,
  View,
} from 'react-native';

import {
  ButtonsContainer,
  ButtonText,
  ButtonView,
  Container,
  CustomNameInputContainer,
  Footer,
  InputText,
  ModalContainer,
  Title,
  InputContainer,
  TelephoneInputContainer,
  DescriptionContainer,
  CustomDescriptionInputContainer,
  TextBox,
  NameTextInput,
  TelephoneContainer,
  InputTextMedium,
  ErrorMessageContainer,
  ErrorMessage,
} from './styles';
import { useClients } from '../../hooks/clients';
import Client from '../../@types/Client';

interface AlterClientInfoProps {
  active: boolean;
  onClose?: () => void;
  children?: any;
  client: Client;
}

const AlterClientInfo: React.FC<AlterClientInfoProps> = ({
  active,
  onClose,
  children,
  client,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nameTextBoxValue, setNameTextBoxValue] = useState('0');
  const [descriptionTextBox, setDescriptionTextBox] = useState('');
  const [telephone1TextBox, setTelephone1TextBox] = useState('');
  const [telephone2TextBox, setTelephone2TextBox] = useState('');
  const [
    isTelephone1TextBoxSelected,
    setITelephone1TextBoxSelected,
  ] = useState<boolean>(false);
  const [
    isTelephone2TextBoxSelected,
    setITelephone2TextBoxSelected,
  ] = useState<boolean>(false);
  const [isNameTextBoxSelected, setIsNameTextBoxSelected] = useState<boolean>(
    false,
  );
  const [
    isDescriptionBoxSelected,
    setIsDescriptionBoxSelected,
  ] = useState<boolean>(false);

  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const { updateClientInfo, addNewClient } = useClients();

  useEffect(() => {
    let isCancelled = false;

    try {
      if (!isCancelled) {
        setIsVisible(active);
        setNameTextBoxValue(client.name);
        setDescriptionTextBox(client.description);
        setTelephone1TextBox(client.telephone[0]);
        setTelephone2TextBox(client.telephone[1]);
        Animated.timing(animatedOpacity, {
          toValue: active ? 1 : 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    } catch (e) {
      if (!isCancelled) {
        throw e;
      }
    }

    return () => {
      animatedOpacity.stopAnimation();
      isCancelled = true;
    };
  }, [
    active,
    animatedOpacity,
    client.description,
    client.name,
    client.telephone,
  ]);

  const handleClosePress = useCallback(() => {
    setIsVisible(false);
    setErrorMessage('');
    setNameTextBoxValue('');
    setDescriptionTextBox('');
    setTelephone1TextBox('');
    setTelephone2TextBox('');
    onClose && onClose();
  }, [onClose]);

  const handleSubmitPress = useCallback(() => {
    Keyboard.dismiss();

    if (nameTextBoxValue === '') {
      setErrorMessage('Por Favor, especifique um nome para o cliente!');
      return;
    }

    if (client.id === 'NewClient') {
      addNewClient({
        description: descriptionTextBox,
        telephone: [telephone1TextBox, telephone2TextBox],
        name: nameTextBoxValue,
      });
    } else {
      updateClientInfo(client.id, {
        description: descriptionTextBox,
        telephone: [telephone1TextBox, telephone2TextBox],
        name: nameTextBoxValue,
      });
    }
    handleClosePress();
  }, [
    addNewClient,
    client.id,
    descriptionTextBox,
    handleClosePress,
    nameTextBoxValue,
    telephone1TextBox,
    telephone2TextBox,
    updateClientInfo,
  ]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClosePress}
      onDismiss={handleClosePress}>
      <Container as={Animated.View} style={[{ opacity: animatedOpacity }]}>
        {children && (
          <TouchableNativeFeedback
            onPress={() => {
              onClose && onClose();
            }}>
            {children}
          </TouchableNativeFeedback>
        )}
        <ModalContainer>
          <Title>
            {client.id === 'NewClient' ? 'Novo Cliente' : 'Atulizar Cliente'}
          </Title>

          <InputContainer>
            <InputText>Nome:</InputText>
            <CustomNameInputContainer isActive={isNameTextBoxSelected}>
              <NameTextInput
                value={nameTextBoxValue}
                autoCorrect={false}
                onBlur={() => {
                  setIsNameTextBoxSelected(false);
                }}
                onFocus={() => {
                  setIsNameTextBoxSelected(true);
                }}
                onChangeText={(newValue) => {
                  setNameTextBoxValue(newValue);
                }}
              />
            </CustomNameInputContainer>
          </InputContainer>
          <TelephoneContainer>
            <TelephoneInputContainer>
              <InputText>Telefone 1: </InputText>
              <CustomNameInputContainer isActive={isTelephone1TextBoxSelected}>
                <NameTextInput
                  keyboardType={'phone-pad'}
                  value={telephone1TextBox}
                  autoCorrect={false}
                  onBlur={() => {
                    setITelephone1TextBoxSelected(false);
                  }}
                  onFocus={() => {
                    setITelephone1TextBoxSelected(true);
                  }}
                  onChangeText={(newValue) => {
                    setTelephone1TextBox(newValue);
                  }}
                />
              </CustomNameInputContainer>
            </TelephoneInputContainer>
            <TelephoneInputContainer>
              <InputTextMedium>Telefone 2:</InputTextMedium>
              <CustomNameInputContainer isActive={isTelephone2TextBoxSelected}>
                <NameTextInput
                  keyboardType={'phone-pad'}
                  value={telephone2TextBox}
                  autoCorrect={false}
                  onBlur={() => {
                    setITelephone2TextBoxSelected(false);
                  }}
                  onFocus={() => {
                    setITelephone2TextBoxSelected(true);
                  }}
                  onChangeText={(newValue) => {
                    setTelephone2TextBox(newValue);
                  }}
                />
              </CustomNameInputContainer>
            </TelephoneInputContainer>
          </TelephoneContainer>
          <DescriptionContainer>
            <InputText>Descrição:</InputText>
            <CustomDescriptionInputContainer
              isActive={isDescriptionBoxSelected}>
              <TextBox
                value={descriptionTextBox}
                multiline={true}
                autoCorrect={false}
                onBlur={() => {
                  setIsDescriptionBoxSelected(false);
                }}
                onFocus={() => {
                  setIsDescriptionBoxSelected(true);
                }}
                onChangeText={(newValue) => {
                  setDescriptionTextBox(newValue);
                }}
              />
            </CustomDescriptionInputContainer>
          </DescriptionContainer>
          <Footer>
            <ErrorMessageContainer>
              {errorMessage !== '' ? (
                <IconMaterialIcons
                  name="error-outline"
                  size={10}
                  color="#c53030"
                />
              ) : null}
              <ErrorMessage>{errorMessage ? errorMessage : null}</ErrorMessage>
            </ErrorMessageContainer>
            <ButtonsContainer>
              <TouchableNativeFeedback onPress={handleSubmitPress}>
                <ButtonView>
                  <ButtonText>Salvar</ButtonText>
                </ButtonView>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={handleClosePress}>
                <ButtonView>
                  <ButtonText>Fechar</ButtonText>
                </ButtonView>
              </TouchableNativeFeedback>
            </ButtonsContainer>
          </Footer>
        </ModalContainer>
      </Container>
    </Modal>
  );
};

export default AlterClientInfo;
