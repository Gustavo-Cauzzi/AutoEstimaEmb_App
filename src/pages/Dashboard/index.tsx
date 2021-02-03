import React from 'react';

import { Image } from 'react-native';

import { Container } from './styles';
import TransparentLogo from '../../../assets/LogoTransparente.png';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Image source={TransparentLogo} />
    </Container>
  );
};

export default Dashboard;
