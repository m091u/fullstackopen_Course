import React from "react";

const Search = ({ handleSearch, char }) => {
  return (
    <div>
      Find countries <input value={char} type="text" onChange={handleSearch} />
    </div>
  );
};

export default Search;
