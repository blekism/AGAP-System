import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeductionLogs() {
  const [deductionLogs, setDeductionLogs] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readDeductionLogs.php"
      )
      .then(function (response) {
        console.log(response.data.data);
        setDeductionLogs(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ paddingRight: "10px", maxHeight: "700px" }}>
      <table className="table table-striped">
        <thead>
          <tr
            style={{
              fontSize: "17px",
              fontFamily: "Poppins",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            <th scope="col">Log ID</th>
            <th scope="col">Date and Time</th>
            <th scope="col">Account ID</th>
            <th scope="col">Name</th>
            <th scope="col">Event Name</th>
            <th scope="col">Item</th>
            <th scope="col">Current Stock</th>
            <th scope="col">Deduction Amount</th>
            <th scope="col">Remaining Stock</th>
            <th scope="col">Contribution Amount</th>
          </tr>
        </thead>
        <tbody>
          {deductionLogs.map((deduction, key) => (
            <tr
              key={key}
              style={{
                fontSize: "15px",
                fontFamily: "Poppins",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              <td>{deduction.log_id}</td>
              <td>{deduction.date_of_deduction}</td>
              <td>{deduction.account_id}</td>
              <td>{deduction.last_name + " " + deduction.first_name}</td>
              <td>{deduction.event_name}</td>
              <td>{deduction.item}</td>
              <td>{deduction.current_stock}</td>
              <td>{deduction.deduction_amt}</td>
              <td>{deduction.remaining_stock}</td>
              <td>{deduction.contrib_amt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
