import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { IoReader } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";

import BackButton from "../BackButton";
import Spinner from "../Spinner";
import BookModal from "./BookModal";
import { LoginContext } from "../../App";
import CardBook from "../HomeUser/CardBook";

export default function BooksUserCard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentLogin } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [bookSelected, setBookSelected] = useState([]);
  const navigate = useNavigate();

  // Fetch all books
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/all?order=desc&limit=5`)
      .then((dataResponse) => {
        const response = dataResponse.data;
        console.log(response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 justify-center items-center">
        {/* Utilisation de map() pour itérer sur chaque livre */}
        {books.map((bookItem) => (
          <CardBook book={bookItem} key={bookItem._id} />
        ))}
      </div>

      {showModal && (
        <BookModal book={bookSelected} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
