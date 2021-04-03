import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f2f2db;
  justify-content: center;
  align-items: center;
  
  h1 {
    font-family: 'Montserrat';
    font-weight: 300;
    color: #222;
  }
`;

export const Content = styled.div`
  display: flex;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 0.18rem solid #f93d8e;
`;

export const Logo = styled.img`
  height: 4rem;
  width: 4rem;
  margin-right: 15px;

`;

export const ClientsContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;

  h1 {
    font-family: 'Montserrat';
    font-weight: 500;
    color: #333;   
    margin-bottom: 10px; 
  }
`;

export const ButtonContainer = styled.button`
  height: 1.75rem;
  width: 15rem;
  border: 0;
  border-radius: 10px;
  padding: 0 15px;
  margin-top: 15px;
  background-color: #f93d8e;

  p {
    color: #fff;
    font-weight: 600;
  }
`;

export const InputTitle = styled.h1`
  font-size: 14px;
  margin-top: 10px;
`;

export const ClientListContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0.5rem 1rem;
  flex-direction: column;

  h1 {
    font-family: 'Montserrat';
    font-weight: 500;
    color: #333;   
    margin-bottom: 10px; 
  }
`;

export const ClientList = styled.div`
  background-color: #E2E2CC;
  width: 80%;
  max-height: 20rem;
  margin: 0 auto;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; 
  }
`;