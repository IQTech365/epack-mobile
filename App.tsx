import React from 'react';
import {AuthProvider} from './src/provider/AuthProvider';
import Main from './src/main';
// import './src/utils/DCSLocalize';

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
