import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { WizardProvider } from './contexts/WizardContext';
import Wizard from './components/Wizard/Wizard';

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
            <Title>Ad Campaign Creator</Title>
            <Subtitle>Create and manage your ad campaigns across multiple traffic sources</Subtitle>
          </Header>
          
          <Wizard />
        </AppContainer>
      </WizardProvider>
    </Router>
  );
}

export default App;
