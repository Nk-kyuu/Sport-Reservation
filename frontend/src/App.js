import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Home from './components/Home';
import Court from "./components/Court";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Court" element={<Court />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



/*
 <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Home" element={<Home/>}>
        <Route path="Court" element={<Court/>} />
      </Route>
    </Routes>
    */