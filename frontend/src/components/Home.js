import { Component, React } from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/authen", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.error('success:', data);
        if (data.status == "ok") {
          //alert('authen successfully')
        } else {
          alert("please login");
          localStorage.removeItem("token");
          window.location = "/";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <br />
      <h1>Hello</h1>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
