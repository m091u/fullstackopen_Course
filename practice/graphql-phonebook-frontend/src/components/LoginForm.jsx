import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setError, setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const [login, result] = useMutation(LOGIN, {
  //       onError: (error) => {
  //   setError(error.graphQLErrors[0].message)
  // }})

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setError(error.graphQLErrors[0].message);
      } else if (error.networkError) {
        setError(`Network error: ${error.networkError.message}`);
      } else {
        setError(`Unknown error: ${error.message}`);
      }
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
