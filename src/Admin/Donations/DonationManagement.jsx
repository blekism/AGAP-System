import React from "react";

export default function DonationContent({ donations }) {
  return (
    <div
      style={{ paddingRight: "10px", overflowY: "auto", maxHeight: "750px" }}
    >
      <table className="table table-striped">
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
        <tbody>
          {/* mapping results from db goes here */}
          {donations.map((donation, key) => (
            <tr key={key}>
              <td>{donation.donation_id}</td>
              <td>{donation.donor_lastName}</td>
              <td>{donation.status_name}</td>
              <td>{donation.recipient_type}</td>
              <td>{donation.time}</td>
              <td>{donation.receiver_lastName}</td>
              <td>{donation.received_date}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
