/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconFeather from 'react-native-vector-icons/Feather';

import {
  TouchableNativeFeedback,
  Modal,
  Animated,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {
  ButtonsContainer,
  ButtonText,
  ButtonView,
  Container,
  CustomValueInputContainer,
  Footer,
  InputText,
  InputTextLight,
  InputTextMedium,
  ModalContainer,
  Title,
  CurrentValueContainer,
  InputContainer,
  DateContainer,
  DateButton,
  DescriptionContainer,
  CustomDescriptionInputContainer,
  TextBox,
} from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { useClients } from '../../hooks/clients';
import { formattedDate } from '../../utils/formattedDate';
import AppointmentNote from '../../@types/AppointmentNote';

interface AlterAppointmentNoteModalProps {
  active: boolean;
  onClose?: () => void;
  children?: any;
  appointment: AppointmentNote;
  clientId: string;
}

const AlterAppointmentNoteModal: React.FC<AlterAppointmentNoteModalProps> = ({
  active,
  onClose,
  children,
  appointment,
  clientId,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isValueTextBoxSelected, setIsValueTextBoxSelected] = useState<boolean>(
    false,
  );
  const [isCallendarActive, setIsCallendarActive] = useState<boolean>(false);
  const [textBoxValue, setTextBoxValue] = useState('0');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));
  const [descriptionTextBox, setDescriptionTextBox] = useState('');
  const [
    isDescriptionBoxSelected,
    setIsDescriptionBoxSelected,
  ] = useState<boolean>(false);

  const { updateClientAppointmentNote } = useClients();

  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isCancelled = false;

    try {
      if (!isCancelled) {
        setIsVisible(active);
        setSelectedDate(
          appointment.date ? new Date(appointment.date) : new Date(Date.now()),
        );
        setDescriptionTextBox(
          appointment.description ? appointment.description : '0',
        );
        setTextBoxValue(appointment.value ? String(appointment.value) : '0');
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
    appointment.date,
    appointment.description,
    appointment.value,
  ]);

  const handleClosePress = useCallback(() => {
    setIsVisible(false);
    setTextBoxValue('0');
    setSelectedDate(new Date(Date.now()));
    onClose && onClose();
  }, [onClose]);

  const handleSubmitPress = useCallback(() => {
    Keyboard.dismiss();
    updateClientAppointmentNote(clientId, {
      id: appointment.id,
      date: selectedDate.getTime(),
      description: descriptionTextBox,
      value: Number(textBoxValue),
    });
    handleClosePress();
    ToastAndroid.show('Atendimento Atualizado', ToastAndroid.SHORT);
  }, [
    appointment.id,
    clientId,
    descriptionTextBox,
    selectedDate,
    textBoxValue,
    updateClientAppointmentNote,
    handleClosePress,
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
          <Title>Modificar Atendimento</Title>
          <CurrentValueContainer>
            <InputText>Data:</InputText>
            <InputTextLight>
              {formattedDate(selectedDate.getTime()).split('-')[0]}
            </InputTextLight>
            <TouchableNativeFeedback
              onPress={() => {
                setIsCallendarActive(true);
              }}>
              <DateButton>
                <IconFeather name="calendar" size={20} color="#fff" />
              </DateButton>
            </TouchableNativeFeedback>
          </CurrentValueContainer>
          <DateContainer>
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
          </DateContainer>
          <InputContainer>
            <InputText>Valor:</InputText>
            <InputTextLight>R$</InputTextLight>
            <CustomValueInputContainer isActive={isValueTextBoxSelected}>
              <TextInput
                value={textBoxValue}
                style={{ height: 35, color: '#777' }}
                keyboardType={'decimal-pad'}
                onBlur={() => {
                  setTextBoxValue(textBoxValue === '' ? '0' : textBoxValue);
                  setIsValueTextBoxSelected(false);
                }}
                onFocus={() => {
                  setIsValueTextBoxSelected(true);
                }}
                onChangeText={(newValue) => {
                  setTextBoxValue(newValue);
                }}
              />
            </CustomValueInputContainer>
          </InputContainer>
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

export default AlterAppointmentNoteModal;
