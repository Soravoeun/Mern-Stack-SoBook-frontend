import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { useSnackbar } from "notistack";
import { IoHeartCircleOutline } from "react-icons/io5";

function Favoris() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);
  const { currentLogin } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    favorBooks();
  }, []);

  const favorBooks = async () => {
    try {
      const selectedBooks = localStorage.getItem("favoriteBooks")
        ? localStorage.getItem("favoriteBooks").split(",")
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
      setFavoriteBooks(fetchedBooks);
      setCheckoutDisabled(selectedBooks.length === 0);
    } catch (error) {
      console.error("Error when fetching books:", error);
    }
  };

  const removeLikeFromCart = (id) => {
    const storedLikeBooks = localStorage.getItem("favoriteBooks");
    if (storedLikeBooks) {
      try {
        const currentLikeBooks = localStorage.getItem("favoriteBooks")
          ? localStorage.getItem("favoriteBooks").split(",")
          : [];
        const updatedStoredBooks = currentLikeBooks.filter(
          (bookId) => bookId !== id
        );
        if (updatedStoredBooks.length > 0) {
          localStorage.setItem("favoriteBooks", updatedStoredBooks);
        } else {
          localStorage.removeItem("favoriteBooks");
        }

        console.log(updatedStoredBooks);
        console.log(id);
        favorBooks();
      } catch (error) {
        console.warn("No 'books' data found in localStorage.");
      }
    } else {
      console.warn("No 'books' found.");
    }
  };

  const moveToCart = (favoriteBooks) => {
    if (currentLogin.isConnected) {
      //   setFavoriteBooks([]);
      //   toggleModal();
      //   localStorage.removeItem("favoriteBooks");
      //   setCheckoutDisabled(true);
      try {
        // source du produit à ajouter
        const currentFavoriteBooks = localStorage.getItem("favoriteBooks")
          ? localStorage.getItem("favoriteBooks").split(",")
          : [];

        // destination à ajouter les livres
        const currentBooks = localStorage.getItem("books")
          ? localStorage.getItem("books").split(",")
            : [];
          
        for (let i = 0; i < currentFavoriteBooks.length; i++) {
          // si livre n'est pas  dans le panier, ajoute le livre venant de la source.
          if (!currentBooks.includes(currentFavoriteBooks[i])) {
            currentBooks.push(currentFavoriteBooks[i]);
          }
        }
        localStorage.setItem("books", currentBooks);
        localStorage.removeItem("favoriteBooks");
        setCheckoutDisabled(true);
        enqueueSnackbar("Livres ajoutés au panier avec success", {
          variant: "success",
        });
        navigate("/cart");
      } catch (error) {
        console.error("Error moving to cart:", error.message);
        navigate("/error");
      }
    } else navigate("/error");
  };

  const handleContinueShopping = () => {
    navigate("/books/all");
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
    
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 sm:px-20  bg-gray-300 border-b border-gray-200 relative">
            <div className="flex items-center justify-between gap-2">
              <IoHeartCircleOutline className="text-3xl text-red-500" />
              <h1 className=" text-3xl flex-grow">Favoris</h1>
            </div>
          </div>
          <div className="mt-8 mb-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200"></ul>
              {favoriteBooks.map((book, key) => (
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
                      onClick={() => removeLikeFromCart(book._id)}
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
                  Sélectionner d'autres livres
                  <span aria-hidden="true"> &larr; </span>
                </button>
              </p>
              <button
                disabled={checkoutDisabled}
                data-modal-target="static-modal"
                data-modal-toggle="static-modal"
                onClick={moveToCart}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-600"
              >
                Ajouter au panier
              </button>

              {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500"> */}

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favoris;
