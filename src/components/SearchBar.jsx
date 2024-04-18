import React, { useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ setBooks }) => {
  // const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSearch = () => {
    axios
      .post("http://localhost:2468/books/search", { searchText: title })
      .then((dataResponse) => {
        const response = dataResponse.data;
        console.log(dataResponse);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="inline-flex items-center m-3 px-2 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <input
        type="text"
        placeholder="Rechercher..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="placeholder:text-white bg-transparent border-none focus:outline-none mx-2"
      />

      <button
        onClick={handleSearch}
        className="text-2xl text-green hover:text-black focus:outline-none"
      >
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchBar;
