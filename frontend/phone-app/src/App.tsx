import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorComponent from './error-page/Error';
import PhoneMessageForm from './form/PhoneMessageForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<PhoneMessageForm />} />
          <Route path="/error" element={<ErrorComponent />} />
          <Route path="/response" element={<PhoneMessageForm />} /> 
        </Routes>
      </header>
    </div>
  );
}

export default App;
