import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Axios from "axios";

function Login() {
    // const [userlist, setuserlist] = useState([{}]);
  
    // const [UserID, checkuser] = useState("");
    // const [password, checkpassword] = useState("");
  
    // const getuser = () => {
    //   Axios.get("http://localhost:5000/user").then((response) => {
    //     setuserlist(response.data);
    //   });
    // };
  
    // const userlogin = () =>{
  
    // }
    // useEffect(() => {
    //   fetch("/api").then(
    //     response => response.json()
    //   ).then(
    //     data => {
    //       setBackendData(data)
    //     }
    //   )
    // }, [])
  
    return (
      <div classname="App container">
        <h1>Login</h1>
        <form action = "/login" method="post">
          <input type="text" name="UserID" placeholder="enter UserID" required></input>
          <input type="text" name="password" placeholder="enter password" required></input>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  
  export default Login;
  