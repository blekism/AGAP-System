import React from "react";

export default function InputTemplateAdmin({ onChange, value, name }) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        @
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
}
