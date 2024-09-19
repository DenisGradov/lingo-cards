import './App.scss'
import { useState, useEffect } from 'react'
import {fetchHelloWorld} from "./api/helloWorldApi.js";
function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const getMessage = async () => {
      try {
        const data = await fetchHelloWorld();
        setMessage(data);
      } catch (error) {
        setMessage('Error fetching message');
      }
    };

    getMessage();
  }, []);
  return (
    <h1>{message}</h1>
  )
}

export default App
