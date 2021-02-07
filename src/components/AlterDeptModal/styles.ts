import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.5);
`;

export const ModalContainer = styled.View`
  width: 320px;
  height: 280px;
  background-color: #f2f2db;
  border-radius: 10px;
  padding: 10px 20px;
`;

// fs = font-size shortcut
export const Title = styled.Text<{ fs?: number }>`
  font-family: 'Montserrat Bold';
  font-size: 17px;
  color: #777;

  ${(props) =>
    props.fs
      ? css`
          font-size: ${props.fs}px;
        `
      : null}
`;

export const InputText = styled.Text`
  font-family: 'Montserrat SemiBold';
  font-size: 15px;
  color: #777;
`;

export const InputTextMedium = styled.Text`
  font-family: 'Montserrat Medium';
  font-size: 15px;
  color: #777;
`;

export const InputTextLight = styled.Text`
  font-family: 'Montserrat Light';
  font-size: 15px;
  color: #777;
  margin-left: 5px;
`;

export const CurrentValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  align-self: stretch;
  width: 100%;
`;

export const InputContainer = styled.View`
  margin: 10px 0px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const CustomValueInputContainer = styled.View<{ isActive: boolean }>`
  width: 75px;
  height: 35px;
  margin-left: 10px;
  margin-top: 5px;
  background-color: #e6e6cc;
  border-radius: 10px;
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

export const Footer = styled.View`
  height: 30px;
  width: 100%;
  margin-top: auto;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.View`
  height: 100%;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
`;

export const ButtonView = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #f93d8e;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0px 15px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Montserrat Bold';
`;

export const DateContainer = styled.View`
  margin-top: 10px;
  margin-left: -10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const DateButton = styled.View`
  height: 25px;
  width: 90px;
  align-items: center;
  justify-content: center;
  background-color: rgba(249, 61, 142, 0.85);
  margin-left: 10px;
  border-radius: 5px;
  padding: 0px;
`;

export const CurrentSelectedDateText = styled.Text`
  color: #777;
  font-family: 'Montserrat Regular';
  margin-left: 10px;
`;
