import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const api_key = '2b10189SmpQJ3XHmESgf2Hz9k'

function App() {
  const inputFlower = useRef<HTMLInputElement | null>(null);
  const inputLeaves = useRef<HTMLInputElement | null>(null);
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
  const [selectedLeaves, setSelectedLeaves] = useState<string | null>(null);
  const [response, setResponse] = useState<string>();

  const onUploadFlower = () => {
    if (inputFlower.current) {
      inputFlower.current.click();
    }
  };

  const onUploadLeaves = () => {
    if (inputLeaves.current) {
      inputLeaves.current.click();
    }
  };

  const onIdentify = async () => {
    // POST request using fetch with async / await
    const body = `{ "organs": "flower", "images": "${selectedFlower}", "organs": "leaf", "images": "${selectedLeaves}" }`
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body
    };
    const response = await fetch('https://my-api.plantnet.org/v2/identify/all?api-key=2b10189SmpQJ3XHmESgf2Hz9k', requestOptions);
    const data = await response.json();
    setResponse(data);

    console.log(response)
  };

  const handleFlowerChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target) {
      let input = event.target;
      var fReader = new FileReader();
      if (input.files) {
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = (event) => {
          if (event && event.target) {
            setSelectedFlower(event.target.result as string);
          }
        }
      }
    }
  }

  const handleLeavesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target) {
      let input = event.target;
      var fReader = new FileReader();
      if (input.files) {
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = (event) => {
          if (event && event.target) {
            setSelectedLeaves(event.target.result as string);
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>
            <img src={selectedFlower ?? ""} className="App-logo" alt="logo" />
            <br />
            <div>
              <input type='file' id='file' ref={inputFlower} onChange={handleFlowerChange} style={{ display: 'none' }} accept="image/*" />
              <button onClick={onUploadFlower}>Upload Flower Image</button>
            </div>
          </div>
          <div>
            <img src={selectedLeaves ?? ""} className="App-logo" alt="logo" />
            <br />
            <div>
              <input type='file' id='file' ref={inputLeaves} onChange={handleLeavesChange} style={{ display: 'none' }} accept="image/*" />
              <button onClick={onUploadLeaves}>Upload Leaves Image</button>
            </div>
          </div>
        </div>
        <button onClick={onIdentify}>Identify</button>
      </header>
    </div>
  );
}

export default App;
