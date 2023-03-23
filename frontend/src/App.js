import React from "react";
import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ReserveTest from "./components/ReserveTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/reserve" element={<ReserveTest/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
