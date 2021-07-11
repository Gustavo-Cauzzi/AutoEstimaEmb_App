/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  TouchableNativeFeedback,
  Modal,
  Animated,
  Alert,
  Keyboard,
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
  CurrentSelectedDateText,
} from './styles';
import { TextInput } from 'react-native-gesture-handler';
import Client from '../../@types/Client';
import { useClients } from '../../hooks/clients';
import { formattedDate } from '../../utils/formattedDate';
import value from '*.png';

interface AlterDeptModalProps {
  active: boolean;
  onClose?: () => void;
  children?: any;
  client: Client;
}

const AlterDeptModal: React.FC<AlterDeptModalProps> = ({
  active,
  onClose,
  children,
  client,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isValueTextBoxSelected, setIsValueTextBoxSelected] = useState<boolean>(
    false,
  );
  const [isCallendarActive, setIsCallendarActive] = useState<boolean>(false);
  const [valueTextBox, setValueTextBox] = useState('0');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));

  const { updateClientDept } = useClients();

  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isCancelled = false;

    try {
      if (!isCancelled) {
        setIsVisible(active);
        setValueTextBox(
          client.currentDept.value ? String(client.currentDept.value) : '0',
        );
        setSelectedDate(
          client.currentDept?.since
            ? new Date(client.currentDept.since)
            : new Date(Date.now()),
        );
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
    client.currentDept.since,
    client.currentDept.value,
  ]);

  const handleClosePress = useCallback(() => {
    setIsVisible(false);
    setValueTextBox('0');
    setSelectedDate(new Date(Date.now()));
    onClose && onClose();
  }, [onClose]);

  const handleSubmitPress = useCallback(() => {
    Keyboard.dismiss();
    if (valueTextBox === '0' || valueTextBox === '') {
      Alert.alert(
        'Zerar Dívida',
        'Você está alterando o valor da dívida para R$ 0,00. \n\nVocê tem certeza que queres zerar a dívida?',
        [
          {
            text: 'Sim',
            onPress: () => {
              updateClientDept(client.id, {});
              handleClosePress();
            },
          },
          {
            text: 'Não',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      updateClientDept(client.id, {
        value: Number(valueTextBox),
        since: selectedDate.getTime(),
      });
      handleClosePress();
    }
  }, [
    client.id,
    handleClosePress,
    selectedDate,
    updateClientDept,
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
          <Title>Alterar Dívida</Title>
          <CurrentValueContainer>
            <InputText>Valor Atual da Dívida:</InputText>
            <InputTextLight>
              R$ {client.currentDept.value ? client.currentDept.value : 0}
            </InputTextLight>
          </CurrentValueContainer>
          <InputContainer>
            <InputTextMedium>Alterar para:</InputTextMedium>
            <InputTextLight>R$ </InputTextLight>
            <CustomValueInputContainer isActive={isValueTextBoxSelected}>
              <TextInput
                value={valueTextBox}
                style={{ height: 35, color: '#777' }}
                keyboardType={'decimal-pad'}
                onBlur={() => {
                  setValueTextBox(valueTextBox === '' ? '0' : valueTextBox);
                  setIsValueTextBoxSelected(false);
                }}
                onFocus={() => {
                  setIsValueTextBoxSelected(true);
                }}
                onChangeText={(newValue) => {
                  setValueTextBox(newValue);
                }}
              />
            </CustomValueInputContainer>
          </InputContainer>
          <CurrentValueContainer>
            <InputText>Desde:</InputText>
            <InputTextLight>
              {valueTextBox !== '0' && valueTextBox !== ''
                ? formattedDate(selectedDate.getTime()).split('-')[0]
                : 'Não há dívida'}
            </InputTextLight>
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
            <TouchableNativeFeedback
              onPress={() => {
                setIsCallendarActive(true);
              }}>
              <DateButton>
                <ButtonText
                  style={{ fontSize: 12, fontFamily: 'Montserrat Medium' }}>
                  Alterar data
                </ButtonText>
              </DateButton>
            </TouchableNativeFeedback>
          </DateContainer>
          <Footer>
            <ButtonsContainer>
              <TouchableNativeFeedback onPress={handleSubmitPress}>
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

export default AlterDeptModal;
