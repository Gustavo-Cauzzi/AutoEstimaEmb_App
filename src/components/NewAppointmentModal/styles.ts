import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.5);
`;

export const ModalContainer = styled.View`
  width: 320px;
  height: 350px;
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
  font-family: 'Montserrat Reguçar';
  font-size: 15px;
  color: #777;
`;

export const ValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  align-self: stretch;
  width: 100%;
`;

export const DescriptionContainer = styled.View`
  margin-top: 20px;
  width: 100%;
`;

export const DateContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const CustomValueInputContainer = styled.View<{ isActive: boolean }>`
  width: 75px;
  height: 35px;
  margin-left: 10px;
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

// eslint-disable-next-line prettier/prettier
export const CustomDescriptionInputContainer = styled.View<{isActive: boolean}>`
  background-color: #e6e6cc;
  width: 100%;
  height: 105px;
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

export const TextBox = styled.TextInput`
  color: #777;
  font-size: 14px;
  flex: 1;
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

export const DateButton = styled.View`
  height: 25px;
  width: 120px;
  align-items: center;
  justify-content: center;
  background-color: #f93d8e;
  margin-left: 10px;
  border-radius: 5px;
  padding: 0px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Montserrat Bold';
`;

export const CurrentSelectedDateText = styled.Text`
  color: #777;
  font-family: 'Montserrat Regular';
  margin-left: 10px;
`;
