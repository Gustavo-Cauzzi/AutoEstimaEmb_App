/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TouchableNativeFeedback, Modal, Animated } from 'react-native';
import {
  ButtonsContainer,
  ButtonText,
  ButtonView,
  Container,
  CurrentSelectedDateText,
  CustomDescriptionInputContainer,
  CustomValueInputContainer,
  DateButton,
  DateContainer,
  DescriptionContainer,
  Footer,
  InputText,
  ModalContainer,
  TextBox,
  Title,
  ValueContainer,
} from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { useClients } from '../../hooks/clients';
import uuid from 'react-native-uuid';

interface NewAppointmentModalProps {
  active: boolean;
  onClose?: () => void;
  children?: any;
  clientId: string;
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  active,
  onClose,
  children,
  clientId,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCallendarActive, setIsCallendarActive] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));
  const [
    isDescriptionBoxSelected,
    setIsDescriptionBoxSelected,
  ] = useState<boolean>(false);
  const [isValueBoxSelected, setIsValueBoxSelected] = useState<boolean>(false);
  const [valueTextBox, setValueTextBox] = useState('');
  const [descriptionTextBox, setDescriptionTextBox] = useState('');

  const { addAppointmentToClient } = useClients();

  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const handleClosePress = useCallback(() => {
    setIsVisible(false);
    setSelectedDate(new Date(Date.now()));
    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    let isCancelled = false;

    try {
      if (!isCancelled) {
        if (active) {
          setIsVisible(active);
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        } else {
          handleClosePress();
        }
      }
    } catch (e) {
      if (!isCancelled) {
        throw e;
      }
    }

    return () => {
      isCancelled = true;
      animatedOpacity.stopAnimation();
    };
  }, [active, animatedOpacity, handleClosePress]);

  const handleAddNewAppointment = useCallback(() => {
    addAppointmentToClient(clientId, {
      date: selectedDate.getTime(),
      description: descriptionTextBox,
      value: Number(valueTextBox === '' ? 0 : valueTextBox),
      id: uuid.v4(),
    });
    handleClosePress();
  }, [
    addAppointmentToClient,
    clientId,
    handleClosePress,
    selectedDate,
    descriptionTextBox,
    valueTextBox,
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
          <Title>Registrar novo atendimento</Title>
          <DateContainer>
            <InputText>Data:</InputText>
            {isCallendarActive && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="calendar"
                onChange={(e: any, date: Date | undefined) => {
                  console.log('data selecionada: ', date);
                  if (date) {
                    setSelectedDate(date);
                  }
                  setIsCallendarActive(false);
                }}
              />
            )}
            <TouchableNativeFeedback
              onPress={() => {
                setIsCallendarActive(true);
              }}>
              <DateButton>
                <ButtonText style={{ fontSize: 12 }}>Escolher data</ButtonText>
              </DateButton>
            </TouchableNativeFeedback>
            <CurrentSelectedDateText>
              {String(selectedDate.getDate()).padStart(2, '0')}/
              {String(selectedDate.getMonth() + 1).padStart(2, '0')}/
              {selectedDate.getFullYear()}
            </CurrentSelectedDateText>
          </DateContainer>
          <ValueContainer>
            <InputText>Valor: R$</InputText>
            <CustomValueInputContainer isActive={isValueBoxSelected}>
              <TextInput
                style={{ height: 35 }}
                keyboardType={'decimal-pad'}
                onBlur={() => {
                  setIsValueBoxSelected(false);
                }}
                onFocus={() => {
                  setIsValueBoxSelected(true);
                }}
                onChangeText={(newValue) => {
                  setValueTextBox(newValue === '' ? '0' : newValue);
                }}
              />
            </CustomValueInputContainer>
          </ValueContainer>
          <DescriptionContainer>
            <InputText>Descrição:</InputText>
            <CustomDescriptionInputContainer
              isActive={isDescriptionBoxSelected}>
              <TextBox
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
            <ButtonsContainer>
              <TouchableNativeFeedback onPress={handleAddNewAppointment}>
                <ButtonView>
                  <ButtonText>Ok</ButtonText>
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

export default NewAppointmentModal;
