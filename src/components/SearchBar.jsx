import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SearchBar = ({getSearch}) => {
  const [searchTag, setSearchTag] = useState("");

  const handleChange = e =>{
    setSearchTag(e.target.value);
    getSearch(searchTag);
  }

  return (
    <div className="p-8 my-6 text-center">
      <input
        type="text"
        placeholder="Search by tag"
        value={searchTag}
        onChange={handleChange}
        className="search-bar"
      />
    </div>
  )
}

export default SearchBar;