import React from 'react';
import { useState } from "react";

const LoginForm = ({handleLogin,username,setUsername,password,setPassword}) => {

  return (
    <div>
       <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                data-testid="username"
                id="username"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="text"
                id="password"
                data-testid="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit" id="login-button">
              Login
            </button>
          </form>
    </div>
  );
};

export default LoginForm;