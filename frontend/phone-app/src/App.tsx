import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormContainer from './container/FormContainer';
import ErrorComponent from './error-page/Error';
import PageNotFound from './error-page/NotFound';
import PhoneMessageForm from './form/PhoneMessageForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormContainer>
          <Routes>
            <Route index element={<PhoneMessageForm />} />
            <Route path="/error" element={<ErrorComponent />} />
            <Route path="/response" element={<PhoneMessageForm />} /> 
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </FormContainer>
      </header>
    </div>
  );
}

export default App;
