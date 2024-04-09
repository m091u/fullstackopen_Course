import React, { useContext, useEffect } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const { notification, dispatch } = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? 'block' : 'none'
  };

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification, dispatch]);

  return <div style={style}>{notification && notification.message}</div>;
};

export default Notification;
