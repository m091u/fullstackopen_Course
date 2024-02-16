const Search = ({ handleSearch, char }) => {
  return (
    <>
      Filter shown with:{" "}
      <input
        value={char}
        type="text"
        onChange={(event) => handleSearch(event)}
      />
    </>
  );
}

export default Search;
