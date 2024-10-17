import React from "react";

export default function ItemManagementTable({
  items,
  deductValue,
  name,
  onChange,
}) {
  return (
    <div style={{ overflowY: "auto", maxHeight: "750px" }}>
      <table className="table table-striped">
        <thead>
          <tr
            style={{
              fontSize: "25px",
              fontFamily: "Poppins",
              fontWeight: "500",
            }}
          >
            <th scope="col">Item</th>
            <th scope="col">Total Stock</th>
            <th scope="col">Amount Deduction</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping results from db goes here */}
          {items.map((item, key) => (
            <tr
              style={{
                fontSize: "20px",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
              key={key}
            >
              <td>{item.item}</td>
              <td>{item.total_Stock}</td>
              <td>
                <div className="input-group mb-3" style={{ width: "70%" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Amount to Deduct"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={deductValue[item.item] || ""}
                    name={item.item}
                    onChange={(e) => onChange(e, item.item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
