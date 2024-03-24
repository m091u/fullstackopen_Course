import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="formDiv">
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input
            value={title}
            id="title"
            data-testid='title'
            onChange={(event) => setTitle(event.target.value)}
          />{" "}
          <br></br>
          Author:{" "}
          <input
            value={author}
            id="author"
            data-testid='author'
            onChange={(event) => setAuthor(event.target.value)}
          />{" "}
          <br></br>
          Url:{" "}
          <input
            value={url}
            id="url"
            data-testid='url'
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit" id='submit-button' data-testid='create'>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
