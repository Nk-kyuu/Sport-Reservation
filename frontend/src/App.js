import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Court from "./components/Court";
import AdminHome from "./components/AdminHome";
import UserDataManage from "./components/UserDataManage";
import MyReservation from "./components/MyReservaion";
import AdminReservation from "./components/AdminReservation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Court" element={<Court />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/UserDataManage" element={<UserDataManage />} />
          <Route path="/MyReservation" element={<MyReservation/>} />
          <Route path="/AdminReservation" element={<AdminReservation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
