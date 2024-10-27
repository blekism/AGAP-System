import React from "react";

export default function InputTemplateAdmin({
  placeholder,
  onChange,
  value,
  name,
  title,
}) {
  return (
    <div className="input-group mb-3">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ fontWeight: "bold" }}
      >
        {title}
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
}
