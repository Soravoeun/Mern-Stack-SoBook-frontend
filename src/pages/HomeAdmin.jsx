import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import BooksAdminList from "../components/homeAdmin/BooksAdminList";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BooksUserCard from "../components/homeAdmin/BookUserCard";

const HomeAdmin = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2468/books/all")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
     
      <div className="flex justify-between items-center gap-x-4">
        <h1 className="text-3xl my-8">Liste des Livres</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksAdminList books={books} />
      ) : (
        <BooksUserCard books={books} />
      )}
    </div>
  );
};

export default HomeAdmin;
