import React, { InputHTMLAttributes } from 'react';

import { Container, InputContainer } from './styles';

type iInputComponent = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<iInputComponent> = () => {
  return (
    <Container>
      <InputContainer isSelected={false}/>
    </Container>
  );
};

export default Input;
