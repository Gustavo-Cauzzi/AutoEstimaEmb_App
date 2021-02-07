/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';

import {
  TouchableNativeFeedback,
  Modal,
  Animated,
  StyleSheet,
  Easing,
  Dimensions,
} from 'react-native';
import {
  Container,
  OptionContainer,
  OptionIconContainer,
  OptionsContainer,
  OptionText,
} from './styles';
import NewAppointmentModal from '../NewAppointmentModal';
import Client from '../../@types/Client';
import AlterDeptModal from '../AlterDeptModal';
import AlterClientInfo from '../AlterClientInfo';

interface ClientOptionsMenuModalProps {
  active: boolean;
  onClose?: () => void;
  children: any;
  client: Client;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const ClientOptionsMenuModal: React.FC<ClientOptionsMenuModalProps> = ({
  active,
  onClose,
  children,
  client,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [
    isNewAppointmentModalVisible,
    setIsNewAppointmentModalVisible,
  ] = useState(false);
  const [isDeptModalActive, setIsDeptModalActive] = useState(false);
  const [isClientInfoModalActive, setIsClientInfoModalActive] = useState(false);

  const optionTranslateX = [
    useRef(new Animated.Value(SCREEN_WIDTH)).current,
    useRef(new Animated.Value(SCREEN_WIDTH)).current,
    useRef(new Animated.Value(SCREEN_WIDTH)).current,
  ];

  const animatedOpacity = useRef(new Animated.Value(0)).current;

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
          Animated.stagger(
            150,
            optionTranslateX.map((item) =>
              Animated.timing(item, {
                toValue: 0,
                duration: 750,
                easing: Easing.elastic(1.1),
                useNativeDriver: true,
              }),
            ),
          ).start();
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
      optionTranslateX.map((item) => item.stopAnimation());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, animatedOpacity]);

  const handleClosePress = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      onClose && onClose();
    });
  }, [onClose, animatedOpacity]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClosePress}
      onDismiss={handleClosePress}>
      <Container
        as={Animated.View}
        style={[styles.centeredView, { opacity: animatedOpacity }]}>
        <TouchableNativeFeedback onPress={handleClosePress}>
          {children}
        </TouchableNativeFeedback>

        <OptionsContainer>
          <TouchableNativeFeedback
            onPress={() => setIsClientInfoModalActive(true)}>
            <OptionContainer
              as={Animated.View}
              style={[{ transform: [{ translateX: optionTranslateX[0] }] }]}>
              <OptionText>Editar Informações do Cliente</OptionText>
              <OptionIconContainer>
                <IconFeather name="user" size={20} color="#fff" />
              </OptionIconContainer>
            </OptionContainer>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              setIsDeptModalActive(true);
            }}>
            <OptionContainer
              as={Animated.View}
              style={[{ transform: [{ translateX: optionTranslateX[1] }] }]}>
              <OptionText>Alterar Dívida</OptionText>
              <OptionIconContainer>
                <IconFeather name="dollar-sign" size={20} color="#fff" />
              </OptionIconContainer>
            </OptionContainer>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              setIsNewAppointmentModalVisible(true);
            }}>
            <OptionContainer
              as={Animated.View}
              style={[{ transform: [{ translateX: optionTranslateX[2] }] }]}>
              <OptionText>Novo Atendimento</OptionText>
              <OptionIconContainer>
                <IconFeather name="plus" size={20} color="#fff" />
              </OptionIconContainer>
            </OptionContainer>
          </TouchableNativeFeedback>
        </OptionsContainer>

        <NewAppointmentModal
          clientId={client.id}
          active={isNewAppointmentModalVisible}
          onClose={() => {
            setIsNewAppointmentModalVisible(false);
          }}
        />
        <AlterClientInfo
          active={isClientInfoModalActive}
          client={client}
          onClose={() => {
            setIsClientInfoModalActive(false);
          }}
        />
        <AlterDeptModal
          active={isDeptModalActive}
          client={client}
          onClose={() => {
            setIsDeptModalActive(false);
          }}
        />
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,20,0.5)',
  },
  modalView: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    height: 150,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ClientOptionsMenuModal;
