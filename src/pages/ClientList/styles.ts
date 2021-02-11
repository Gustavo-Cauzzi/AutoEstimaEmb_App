import { RectButton, TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2db;
`;

export const Header = styled.View`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
  background-color: #e6e6cc;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  flex-direction: row;
`;

export const SearchInputContainer = styled.View`
  flex: 1;
  height: 40px;
  border-radius: 10px;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: rgba(210, 210, 186, 0.75);
`;

export const Title = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 20px;
`;

export const ClientName = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 16px;
`;

export const Logo = styled.Image`
  height: 40px;
  width: 40px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px 15px;
`;

export const ClientContainer = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  padding: 0px 7px;
  margin: 4px 0px;
  border-left-width: 1.5px;
  border-left-color: rgba(249, 61, 142, 0.35);
`;

export const ClientButton = styled(RectButton)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const UserIconContainer = styled.View`
  height: 40px;
  width: 40px;
  background-color: #e6e6cc;
  border-radius: 20px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

export const FloatingSerachButtonContainer = styled(RectButton)`
  position: absolute;
  height: 60px;
  width: 60px;
  bottom: 20px;
  right: 20px;
  background-color: rgba(210, 210, 186, 0.75);
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

export const SearchInput = styled(TextInput)`
  width: 275px;
  font-family: 'Montserrat Regular';
  color: #777;
`;

export const NewClientButtonContainer = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  padding: 5px 0px;
`;

export const NewClientButton = styled(RectButton)`
  flex: 1;
  width: 100%;
  background-color: #e6e6cc;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const NewClientButtonText = styled.Text`
  font-family: 'Montserrat Regular';
  color: #777;
`;
