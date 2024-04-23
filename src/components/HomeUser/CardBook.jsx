import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { BiInfoCircle, BiShow } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoReader } from "react-icons/io5";
import { IoHeartCircleOutline } from "react-icons/io5";
import { useSnackbar } from "notistack";

import { CiRead } from "react-icons/ci";
import BookModal from "../homeAdmin/BookModal";
import { LoginContext } from "../../App";

const CardBook = (props) => {
  const { book, id } = props;
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [bookSelected, setBookSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentLogin } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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
      navigate("/cart");
      // if (currentLogin.isConnected) navigate("/cart");
      // else navigate("/connexion");
    } catch (error) {
      console.error("Error saving to cart:", error.message);
    }
  };

  const handleFavorite = (book) => {
    axios
      .post(
        "http://localhost:2468/favorite/book",
        {
          book: book._id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        }
      )
      .then((dataResponse) => {
        const response = dataResponse.data;
        if (response.status === "OK") {
          enqueueSnackbar("Livre ajouté au favoris avec success", {
            variant: "success",
          });
          navigate("/favoris");
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        //   alert("An error happenned. please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <>
      <div
        // key={book._id}
        key={id}
        className=" w-auto bg-gray-700 shadow border-gray-100 rounded-lg  overflow-hidden dark:bg-gray-800 dark:border-gray-700 "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      >
        <div className=" relative ">
          <div className="rounded-lg h-64 bg-gray-200 flex items-center justify-center">
            <img
              // className="w-full h-40 object-contain"
              className="rounded-lg h-64 block mx-auto bg-slate-200 p-5"
              src={book.image}
              alt={book.title}
            />
          </div>
          <button
            onClick={() => {
              handleFavorite(book);
            }}
            className="absolute top-0 right-0 px-1 py-1 text-xs font-medium text-white rounded-lg bg-transparent focus:ring-3 focus:outline-non"
          >
            <IoHeartCircleOutline
              className={`text-3xl ${
                liked ? "text-red-600" : "text-white"
              } hover:text-red-500`}
            />
          </button>
        </div>

        <div className="p-3 text-white dark:text-white-300">
          <h5 className="mb-1 text-sm font-bold tracking-tight">
            {book.title}
          </h5>
          <p className="text-xs">Auteur: {book.author}</p>
          <p className="text-xs">Date de publication: {book.publishYear}</p>
        </div>
        <div className="flex justify-between items-center gap-x-2  ">
          {/* Encadré bleu autour de l'icône BiShow */}
          {/* <div className="inline-flex items-center m-3 px-2 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <BiShow
              className="text-2xl text-green hover:text-black cursor-pointer"
              onClick={() => {
                setShowModal(true);
                setBookSelected(book);
              }}
            />
          </div> */}

          <Link
            to={`/books/description/${book._id}`}
            className="inline-flex items-center m-3 px-2 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <IoReader className="text-2xl text-green hover:text-black" />
          </Link>

          <button
            onClick={() => {
              handleSubmit(book);
            }}
            className="inline-flex items-center m-3 px-2 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <MdShoppingCart className="text-2xl text-green hover:text-black" />
          </button>
        </div>
      </div>
      {showModal && (
        <BookModal book={bookSelected} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default CardBook;
