import React from "react";

export default function Input(props) {
  return (
    <div style={{ height: "50px", display: "flex" }}>
      {props.label && (
        <label style={{ fontSize: "20px", width: 170, display: "flex" }}>
          {props.label} :{" "}
        </label>
      )}
      <input
        type={props.type}
        style={{ height: "25px", width: "200px" }}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
