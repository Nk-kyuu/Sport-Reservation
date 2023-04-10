import { Component, React } from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function ReserveTest() {
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

  const handleReserve = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      UserID: data.get('UserID'),
    }
    fetch('http://localhost:5000/reserve', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },     
       body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        //console.error('success:', data);
        if(data.status == 'ok'){
          alert('update successfully')
        } else {
          alert('update failed')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  };

  return (
    <div>
      <br />
      <h1>Hello</h1>
      <Button variant="contained" onClick={handleReserve}>
        reserve
      </Button>
    </div>
  );
}

export default ReserveTest;
