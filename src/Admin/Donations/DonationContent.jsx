import React from "react";

export default function DonationContent({ donations }) {
  return (
    <div style={{ paddingRight: "10px" }}>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Donation ID</th>
            <th scope="col">Donor</th>
            <th scope="col">Status</th>
            <th scope="col">Recipient</th>
            <th scope="col">Time</th>
            <th scope="col">Recieved By</th>
            <th scope="col">Recieved Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{/* mapping results from db goes here */}</tbody>
      </table>
    </div>
  );
}
