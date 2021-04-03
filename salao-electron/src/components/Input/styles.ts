import styled, { css } from 'styled-components';

interface iInputProps {
  isSelected: boolean;
}

export const Container = styled.div`
 
`;

export const InputContainer = styled.input<iInputProps>`
  border: 0;
  margin: 0 auto;
  background: transparent;
  background-color: #e6e6cc;
  border-radius: 10px;
  border-bottom: 2px solid rgba(249, 61, 142, 0.5);
  padding: 5px 10px;
  font-family: 'Montserrat';
  ${(props) =>
    props.isSelected
      ? css`
          border-bottom-color: #f93d8e;
        `
      : css`
          border-bottom-color: rgba(249, 61, 142, 0.5);
        `}
`;