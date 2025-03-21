import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { WizardProvider } from './contexts/WizardContext';
import Wizard from './components/Wizard';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
`;

function App() {
  return (
    <Router>
      <WizardProvider>
        <AppContainer>
          <Header>
            <Title>Project Creator</Title>
            <Subtitle>Create and manage your projects across multiple data sources</Subtitle>
          </Header>
          
          <Wizard />
        </AppContainer>
      </WizardProvider>
    </Router>
  );
}

export default App;
