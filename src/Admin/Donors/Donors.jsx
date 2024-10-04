import React from "react";

export default function DonorContent({ donations }) {
  return (
    <div style={{ paddingRight: "10px" }}>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Donor ID</th>
            <th scope="col">Name</th>
            <th scope="col">Section</th>
            <th scope="col">Department</th>
            <th scope="col">Designation</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Verified At</th>
            <th scope="col">Status</th>
            <th scope="col">Total Donations</th>
          </tr>
        </thead>
        <tbody>{/* mapping results from db goes here */}</tbody>
      </table>
    </div>
  );
}
