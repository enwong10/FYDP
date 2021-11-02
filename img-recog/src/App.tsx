import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const api_key = '2b10189SmpQJ3XHmESgf2Hz9k'

function App() {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const onUpload = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  
  const onIdentify = () => {
    //
  };

  const handleChange = (event) => {
    
    setSelectedImage(value)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={URL.createObjectURL(inputFile.current)} className="App-logo" alt="logo" /> */}
        <p> {inputFile.current} hello </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{ display: 'none' }} accept="image/*" />
        <button onClick={onUpload}>Upload Image</button>
        <button onClick={onIdentify}>Identify</button>
      </header>
    </div>
  );
}

export default App;
