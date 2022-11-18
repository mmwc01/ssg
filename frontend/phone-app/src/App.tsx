import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label>
            Phone Number:
            <input type="text" name="name" />
          </label>
          <br/>
          <label>
            Message:
            <input type="text" name="name" />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
