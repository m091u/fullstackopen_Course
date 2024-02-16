import React from "react";
import "../App.css";

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  return <div className={isError ? "error" : "notification"}>{message}</div>;
};

export default Notification;
