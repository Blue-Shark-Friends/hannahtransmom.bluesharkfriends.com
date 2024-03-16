import logo from './logo.svg';
import './App.css';
import MeetMyParts from './MeetMyParts.js';
import { useState } from 'react';


function App() {

  const [showHannah, setShowHannah] = useState(false);

    function onClick() {

        setShowHannah(true);

    }

  return (
    <div className="App">
      {
        !showHannah &&
          (
            <div>
              <h1>Hiiii.  I'm Hannah.</h1>
              <h1>I am so excited to meet you.</h1>
              <h1> I would like you to meet my parts</h1>
            </div>
          )
        }
      

      
      <MeetMyParts showHannah={showHannah} onClick={onClick} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
