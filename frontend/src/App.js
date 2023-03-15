import React from "react";
import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';


function App() {
  return (
    <div classname="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
