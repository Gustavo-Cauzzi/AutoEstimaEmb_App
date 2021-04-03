import React, { useState } from 'react';

import { ButtonContainer, Container, ClientsContainer, Header, InputTitle, Logo, ClientListContainer, Content, ClientList } from './styles';

import Flatlist from 'flatlist-react';

import logoImg from '../../assets/LogoTransparente.png';
import Input from '../../components/Input';
import { useClients } from '../../hooks/clients';
import Client from '../../@types/Clients';

const Dashboard: React.FC = () => {
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [description, setDescription] = useState('');

  const {clients} = useClients();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("Cliente: ", name ," | Telefone1: ", phone1 ," | Telefone2: ", phone2 ," | Description: ", description);
  }

  return (
    <Container>
      <Header>
        <Logo src={logoImg} />
        <h1>Salão Autoetima Embelezamento</h1>
      </Header>
      <Content>
        <ClientsContainer>
          <h1>Cadastro de Clientes</h1>
          {/* <form onSubmit={handleFormSubmit}> */}
            <InputTitle>Nome do Cliente:</InputTitle>
            <Input  
              onChange={(e: any) => {
                console.log("dsiadiushudsahus");
                setName(e.target.value);
              }}
            />

            <InputTitle>Telefone 1:</InputTitle>
            <Input  
              onChange={(e: any) => {
                setPhone1(e.target.value);
              }}
            />
            
            <InputTitle>Telefone 2:</InputTitle>
            <Input  
              onChange={(e: any) => {
                setPhone2(e.target.value);
              }}
            />
            
            <InputTitle>Descrição:</InputTitle>
            <Input  
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />

            <ButtonContainer onClick={handleFormSubmit}>
              <p>Adicionar cliente</p>
            </ButtonContainer>
          {/* </form> */}
        </ClientsContainer>
        <ClientListContainer>
          <h1>Clientes cadastrados:</h1>
          
          <ClientList>
            <Flatlist 
              list={clients}
              renderItem={(item: Client) => (
                <h1 key={item.id}>{item.name}</h1>
              )}
            />
          </ClientList>
        </ClientListContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
