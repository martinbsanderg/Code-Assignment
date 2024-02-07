import React from "react";
import "./componentStyles.css";

export const TextOutputField = ({ value }) => {
  return (
    <div className="textbox-container">
      <text>{value}</text>
    </div>
  );
};
