import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import BookModal from "../components/homeAdmin/BookModal";
import { LoginContext } from "../App";
import { IoSearch } from "react-icons/io5";
import CardBook from "../components/HomeUser/CardBook";
import SearchBar from "../components/SearchBar";

export default function BooksUser() {
  const [bookSelected, setBookSelected] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // Fetch all books
  useEffect(() => {
    axios
      .get("http://localhost:2468/books/all")
      .then((dataResponse) => {
        const response = dataResponse.data;
        console.log(response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (book) => {
    // console.log(bookSelected);
    try {
      const currentBooks = localStorage.getItem("books")
        ? localStorage.getItem("books").split(",")
        : [];
      if (!currentBooks.includes(book._id)) {
        currentBooks.push(book._id);
        localStorage.setItem("books", currentBooks);
      }
      // if (currentLogin.isConnected) navigate("/cart");
      // else navigate("/connexion");
    } catch (error) {
      console.error("Error saving to cart:", error.message);
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-x-4 m-5">
        <div>
          <h1 className="text-3xl my-8">Tous les Livres</h1>
        </div>
        <SearchBar setBooks={setBooks}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
        {books.map((bookItem) => (
          // ici book est le props venant du CarBook pour pouvoir appeler et utiliser les composants du card
          <CardBook book={bookItem} key={bookItem._id} />
        ))}
      </div>

      {showModal && (
        <BookModal book={bookSelected} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
