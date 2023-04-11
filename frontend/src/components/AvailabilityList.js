import React, { useState, useEffect } from "react";
import axios from "axios";

function AvailabilityList() {
  const [availabilities, setAvailabilities] = useState([]);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:5000/availabilities")
      .then((res) => {
        setAvailabilities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleAvailabilityStatus = (id, status) => {
    const newStatus = status === 1 ? 0 : 1;
    axios
      .put(`http://localhost:5000/availabilities/${id}`, {
        Status: newStatus,
      })
      .then((res) => {
        // Update the availabilities array with the updated availability
        const updatedAvailabilities = availabilities.map((availability) =>
          availability.AvailabilityID === id
            ? { ...availability, Status: newStatus }
            : availability
        );
        setAvailabilities(updatedAvailabilities);
      })
      .catch((err) => {
        console.log(err);
      });
  };  

  const sortByAvailabilityId = () => {
    const sortedAvailabilities = [...availabilities].sort(
      (a, b) =>
        order === "asc"
          ? a.AvailabilityID - b.AvailabilityID
          : b.AvailabilityID - a.AvailabilityID
    );
    setOrder(order === "asc" ? "desc" : "asc");
    setAvailabilities(sortedAvailabilities);
  };

  return (
    <div>
      <h2>Availability List</h2>
      <button onClick={sortByAvailabilityId}>
        Sort by Availability ID ({order})
      </button>
      <table>
        <thead>
          <tr>
            <th>Availability ID</th>
            <th>Court Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((availability) => (
            <tr key={availability.AvailabilityID}>
              <td>{availability.AvailabilityID}</td>
              <td>{availability.CourtType}</td>
              <td>{availability.dates}</td>
              <td>{availability.startTime}</td>
              <td>{availability.endTime}</td>
              <td>
                <label>
                <input
                  type="checkbox"
                  checked={availability.Status === 1}
                  onChange={() =>
                    toggleAvailabilityStatus(
                      availability.AvailabilityID,
                      availability.Status
                    )
                  }
                />
                  {availability.Status === 1 ? "Available" : "Unavailable"}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvailabilityList;
