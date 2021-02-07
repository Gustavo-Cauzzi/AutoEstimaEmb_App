import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.5);
`;

export const OptionsContainer = styled.View`
  position: absolute;
  bottom: 90px;
  right: 30px;
  flex-direction: column-reverse;
`;

export const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  /* background-color: #ff0; */
  margin: 5px 0px;
`;

export const OptionIconContainer = styled.View`
  height: 35px;
  width: 35px;
  background-color: #f93d8e;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

export const OptionText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: 'Montserrat Bold';
`;
