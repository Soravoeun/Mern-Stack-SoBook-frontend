import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import CartModal from "../components/HomeUser/CartModal";
import ErrorPage from "./ErrorPage";
import { LoginContext } from "../App";
import { MdShoppingCart } from "react-icons/md";

const Cart = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);
  const { currentLogin } = useContext(LoginContext);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const selectedBooks = localStorage.getItem("books")
        ? localStorage.getItem("books").split(",")
        : [];
      const fetchedBooks = [];
      console.log(selectedBooks);

      for (let i = 0; i < selectedBooks.length; i++) {
        const id = selectedBooks[i];
        if (id !== "") {
          const response = await axios.get(
            `http://localhost:2468/books/oneBook/${id}`
          );

          fetchedBooks.push(response.data.data);
        }
      }
      setBooks(fetchedBooks);
      setCheckoutDisabled(selectedBooks.length === 0);
    } catch (error) {
      console.error("Error when fetching books:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleContinueShopping = () => {
    navigate("/books/all");
  };

  const removeFromCart = (id) => {
    // Supprimer l'élément spécifique du panier
    // setBooks((prevBooks) => {
    //   const updatedBooks = prevBooks.filter((book) => book.id !== id);
    //   return updatedBooks;
    // });

    // Mettre à jour le stockage local
    //   const storedBooks = JSON.parse(localStorage.getItem("books"));
    //   const updatedStoredBooks = storedBooks.filter((bookId) => bookId !== id);
    //   localStorage.setItem("books", JSON.stringify(updatedStoredBooks));
    // };

    // Mettre à jour le stockage local
    const storedBooks = localStorage.getItem("books");
    console.log(storedBooks);
    if (storedBooks) {
      try {
        const currentBooks = localStorage.getItem("books")
          ? localStorage.getItem("books").split(",")
          : [];
        const updatedStoredBooks = currentBooks.filter(
          (bookId) => bookId !== id
        );
        if (updatedStoredBooks.length > 0) {
          localStorage.setItem("books", updatedStoredBooks);
        } else {
          localStorage.removeItem("books");
        }

        console.log(updatedStoredBooks);
        console.log(id);
        loadBooks();
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    } else {
      console.warn("No 'books' data found in localStorage.");
    }
  };

  const checkoutCart = () => {
    if (currentLogin.isConnected) {
      setBooks([]);
      toggleModal();
      localStorage.removeItem("books");
      setCheckoutDisabled(true);
    } else navigate("/connexion");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 sm:px-20 bg-white border-b border-gray-200 relative">
            <div className="flex items-center justify-between gap-2">
              <MdShoppingCart className="text-3xl" />
              <h1 className="text-3xl flex-grow">Panier de réservation</h1>
              {/* <button
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={handleClose}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              </button> */}
            </div>
          </div>
          <div className="mt-8 mb-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200"></ul>
              {books.map((book, key) => (
                <li key={key} className="flex py-6 m-5">
                  <div className="h-24 w-24' flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col ">
                    <div className="flex justify-between text-base font-mediumtext-gray-900">
                      <p className="ml-4">{book.title}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <button
                      onClick={() => removeFromCart(book._id)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center py-6 m-5">
              <p>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={handleContinueShopping} // Utiliser la fonction handleContinueShopping pour la redirection
                >
                  <span aria-hidden="true"> &larr; </span>
                  Sélectionner d'autres livres
                </button>
              </p>
              <button
                disabled={checkoutDisabled}
                data-modal-target="static-modal"
                data-modal-toggle="static-modal"
                onClick={checkoutCart}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-600"
              >
                Valider le panier
              </button>

              {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500"> */}

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <CartModal isOpen={isOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Cart;
