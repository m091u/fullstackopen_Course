import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return { message: `New anecdote created: "${action.anecdote.content}"` };
    case "VOTE":
      return { message: `Anecdote voted` };
    case "ERROR":
      return { message: "Anecdote content must be at least 5 characters long."};
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
