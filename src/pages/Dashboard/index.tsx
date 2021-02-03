import React, { useCallback } from 'react';

import {
  ClientNotesButtonContainer,
  ClientNotesButton,
  ClientNotesButtonText,
  Container,
  Header,
  HeaderTitle,
  HeaderTitleContainer,
  Logo,
} from './styles';
import TransparentLogo from '../../../assets/LogoTransparente.png';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface DashboardProps {
  navigation?: any;
}

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const handleGoToClientNotes = useCallback(() => {
    navigation.navigate('ClientList');
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Logo source={TransparentLogo} />
        <HeaderTitleContainer>
          <HeaderTitle>Autoestima {'\n'}Embelezamento</HeaderTitle>
        </HeaderTitleContainer>
      </Header>
      <ClientNotesButtonContainer>
        <TouchableNativeFeedback onPress={handleGoToClientNotes}>
          <ClientNotesButton>
            <ClientNotesButtonText>Fichário dos Clientes</ClientNotesButtonText>
          </ClientNotesButton>
        </TouchableNativeFeedback>
      </ClientNotesButtonContainer>
    </Container>
  );
};

export default Dashboard;
