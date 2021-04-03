import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2db;
`;

export const Header = styled.View`
  flex-direction: row;
  height: 130px;
  width: 100%;
  align-items: center;
  padding: 0px 20px;
`;

export const Logo = styled.Image`
  height: 100px;
  width: 100px;
  margin-right: 15px;
`;

export const HeaderTitleContainer = styled.View`
  flex-wrap: wrap;
  border-left-width: 1.5px;
  border-left-color: #f93d8e;
  padding-left: 10px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  flex-wrap: wrap;
  font-family: 'Montserrat Light';
`;

export const ClientNotesButtonContainer = styled.View`
  margin-top: auto;
  width: 100%;
  height: 75px;
  padding: 10px 15px;
`;

export const ClientNotesButton = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(210, 210, 186, 0.75);
  justify-content: center;
  align-items: center;
`;

export const ClientNotesButtonText = styled.Text`
  font-size: 15px;
  font-family: 'Montserrat Regular';
`;
