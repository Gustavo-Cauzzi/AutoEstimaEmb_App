import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2db;
`;

export const Header = styled.View`
  width: 100%;
  height: 105px;
  justify-content: center;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 10px 15px;
`;

export const UserIconContainer = styled.View`
  height: 75px;
  width: 75px;
  background-color: #e6e6cc;
  border-radius: 37.5px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

export const ClientInfoContainer = styled.View`
  width: 100%;
  margin-top: auto;
  flex-direction: row;
  padding: 10px 25px;
`;

export const ClientInfo = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 8px;
`;

export const ClientName = styled.Text`
  font-family: 'Montserrat Regular';
  font-size: 25px;
  margin-bottom: 3px;
`;

export const ClientPhoneContainer = styled.View`
  flex-direction: row;
`;

export const PhoneNumber = styled.Text`
  font-family: 'Montserrat Regular';
  font-size: 15px;
  margin-left: 5px;
`;

// fs = font-size shortcut
export const Title = styled.Text<{ fs?: number }>`
  font-family: 'Montserrat Regular';
  font-size: 25px;
  margin-left: 5px;
  color: #777;

  ${(props) =>
    props.fs
      ? css`
          font-size: ${props.fs}px;
        `
      : null}
`;

export const AccordionTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: rgba(249, 61, 142, 0.35);
  border-bottom-width: 1.5px;
`;

export const AppointmentNotesContent = styled.View`
  padding: 0px 10px;
`;

export const InformationContainer = styled.View`
  width: 100%;
  padding: 10px 10px;
  padding-bottom: 0px;
`;

export const AppointmentHeaderContainer = styled.View`
  width: auto;
  padding: 5px 10px;
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: rgba(249, 61, 142, 0.25);
`;

export const EmptyAppointmentsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
`;

export const EmptyAppointmentsText = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 15px;
`;

export const AppointmentHeaderText = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 20px;
`;

export const AppointmentHeaderHour = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 16px;
  margin-top: 4.5px;
`;

export const AppointmentContainer = styled.View`
  width: 100%;
  padding: 10px 5px;
`;

export const AppointmentText = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 14px;
`;

export const AppointmentTextBold = styled.Text`
  font-family: 'Montserrat Regular';
  font-size: 16px;
  margin-right: 5px;
`;

export const DescriptionInputContainer = styled.View`
  background-color: rgba(230, 230, 192, 0.3);
  padding: 10px 15px;
  width: 95%;
  border-radius: 10px;
`;

export const DescriptionText = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 12px;
`;

export const DeptContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const DebtTitle = styled.Text`
  font-family: 'Montserrat Regular';
  font-size: 18px;
`;

export const FloatingOptionsMenuContainer = styled(RectButton)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: #f93d8e;
`;

export const DebtStatus = styled.Text<{ isInDept: boolean }>`
  font-family: 'Montserrat Regular';
  font-size: 18px;
  margin-top: 2px;
  margin-left: 5px;

  ${(props) =>
    props.isInDept
      ? css`
          color: #c53030;
        `
      : css`
          color: #38d85e;
        `}
`;

export const DebtQuantity = styled.Text`
  font-family: 'Montserrat Regular';
  font-size: 18px;
  color: rgba(197, 48, 48, 0.75);
  margin-left: 5px;
`;

export const TextBox = styled.TextInput`
  color: #777;
  font-size: 14px;
  flex: 1;
`;

// eslint-disable-next-line prettier/prettier
export const CustomDescriptionInputContainer = styled.View<{isActive: boolean}>`
  background-color: #e6e6cc;
  width: 100%;
  height: 65px;
  padding-left: 5px;
  padding-right: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(249, 61, 142, 0.5);
  ${(props) =>
    props.isActive
      ? css`
          border-bottom-color: #f93d8e;
        `
      : css`
          border-bottom-color: rgba(249, 61, 142, 0.5);
        `}
`;

export const ButtonsContainer = styled.View`
  height: 25px;
  margin: 10px 0px 0px 5px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonView = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #f93d8e;
  border-radius: 5px;
  padding: 0px 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Montserrat Regular';
`;

export const EditIconContainer = styled.View`
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
`;
