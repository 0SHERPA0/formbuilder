import React from "react";

const Label = ({ children }) => {
  return <label>{children || "Default Label"}</label>;
};

export default Label;
