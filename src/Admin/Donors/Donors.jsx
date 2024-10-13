import React from "react";

export default function DonorContent({ donors }) {
  return (
    <div style={{ paddingRight: "10px" }}>
      <table className="table table-striped">
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
            <th scope="col">Total Donations</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping results from db goes here */}
          {donors.map((donor, key) => (
            <tr key={key}>
              <td>{donor.account_id}</td>
              <td>{donor.last_name}</td>
              <td>{donor.section}</td>
              <td>{donor.category_name}</td>
              <td>{donor.designation_name}</td>
              <td>{donor.email}</td>
              <td>{donor.contact_info}</td>
              <td>{donor.verified_at}</td>
              <td>{donor.total_donations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
