import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  if (authorsResult.loading || booksResult.loading) {
    return <div>Loading...</div>;
  }

  if (authorsResult.error) {
    return <div>Error loading authors: {authorsResult.error.message}</div>;
  }

  if (booksResult.error) {
    return <div>Error loading books: {booksResult.error.message}</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={authorsResult.data.allAuthors}
        token={token}
      />

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <NewBook show={page === "add"} />

      {!token && <LoginForm show={page === "login"} setToken={setToken} />}
    </div>
  );
};

export default App;
